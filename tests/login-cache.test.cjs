const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync('app.js', 'utf8').split('document.addEventListener("visibilitychange"')[0];
const timestamp = '2026-10-30T03:00:00.000Z';
const nextTimestamp = '2026-10-30T03:01:00.000Z';

function setup({ quotaExceeded = false, cloud, failDatabase = false } = {}) {
  const records = new Map();
  const local = new Map();
  const elements = new Map(['auth-screen', 'app-shell'].map(id => [id, { hidden: id === 'app-shell', innerHTML: '' }]));
  const calls = [];
  const timers = new Set();
  const indexedDB = {
    open() {
      const request = {};
      queueMicrotask(() => {
        if (failDatabase) { request.error = new Error('Unavailable'); request.onerror(); return; }
        request.result = {
          transaction() {
            const transaction = {
              objectStore() {
                return {
                  get(key) {
                    const get = { result: structuredClone(records.get(key)) };
                    queueMicrotask(() => transaction.oncomplete());
                    return get;
                  },
                  put(record, key) {
                    records.set(key, structuredClone(record));
                    queueMicrotask(() => transaction.oncomplete());
                  }
                };
              }
            };
            return transaction;
          }
        };
        request.onsuccess();
      });
      return request;
    }
  };
  const context = vm.createContext({
    structuredClone, indexedDB, AbortController,
    console: { log() {}, warn() {}, error() {} },
    setTimeout(fn, ms) { const id = setTimeout(fn, ms); id.unref(); timers.add(id); return id; },
    clearTimeout,
    localStorage: {
      getItem: key => local.get(key) ?? null,
      setItem(key, value) { if (quotaExceeded) throw new Error('QuotaExceededError'); local.set(key, value); }
    },
    document: { getElementById: id => elements.get(id) },
    window: { confirm: () => false },
    navigator: { onLine: true }
  });
  vm.runInContext(source, context);
  context.testClient = {
    from() {
      let columns, userId;
      const query = {
        select(value) { columns = value; return query; },
        eq(field, value) { userId = value; return query; },
        maybeSingle() { return query; },
        abortSignal() { calls.push({ columns, userId }); return cloud({ columns, userId }); }
      };
      return query;
    }
  };
  vm.runInContext(`
    supabaseClient = testClient;
    render = () => { globalThis.lastRenderedUser = activeUser.id; globalThis.lastRenderedState = structuredClone(state); };
    setCloudSaveStatus = status => { cloudSaveStatus = status; };
    reanalyzeStoredColors = () => {};
    clearClosetOutfitSelections = () => {};
    scheduleCloudSave = (userId, snapshot) => { globalThis.lastSave = { userId, snapshot: structuredClone(snapshot) }; };
    showAccountLoadError = error => { globalThis.loadError = error.message; };
  `, context);
  const run = code => vm.runInContext(code, context);
  const snapshot = run('structuredClone(defaultState)');
  snapshot.updatedAt = timestamp;
  return { context, records, local, elements, calls, run, snapshot, cleanup: () => timers.forEach(clearTimeout) };
}

test('large account cache opens before the network and downloads only metadata when unchanged', async t => {
  let resolveMetadata;
  const app = setup({ quotaExceeded: true, cloud: () => new Promise(resolve => { resolveMetadata = resolve; }) });
  t.after(app.cleanup);
  app.snapshot.items[0].image = 'data:image/jpeg;base64,' + 'x'.repeat(6 * 1024 * 1024);
  app.context.snapshot = app.snapshot;
  assert.equal(await app.run(`writeAccountCache('account-a', snapshot, '${timestamp}')`), true);
  assert.equal(app.local.size, 0);
  const login = app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  await new Promise(setImmediate);
  assert.equal(app.elements.get('app-shell').hidden, false);
  assert.equal(app.context.lastRenderedState.items[0].image.length, app.snapshot.items[0].image.length);
  assert.deepEqual(app.calls, [{ columns: 'updated_at', userId: 'account-a' }]);
  resolveMetadata({ data: { updated_at: timestamp }, error: null });
  await login;
  assert.equal(app.run('syncedUserId'), 'account-a');
  assert.equal(app.calls.length, 1);
});

test('a changed remote version downloads and renders the current cloud wardrobe', async t => {
  let app;
  app = setup({ cloud: async ({ columns }) => columns === 'updated_at'
    ? { data: { updated_at: nextTimestamp }, error: null }
    : { data: { state: { ...app.snapshot, items: [], updatedAt: nextTimestamp }, updated_at: nextTimestamp }, error: null } });
  t.after(app.cleanup);
  app.records.set('account-a', { state: app.snapshot, cloudUpdatedAt: timestamp });
  await app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  assert.deepEqual(app.calls.map(call => call.columns), ['updated_at', 'state, updated_at']);
  assert.equal(app.context.lastRenderedState.items.length, 0);
});

test('unsynced edits are uploaded when the remote version is unchanged', async t => {
  const app = setup({ cloud: async () => ({ data: { updated_at: timestamp }, error: null }) });
  t.after(app.cleanup);
  app.snapshot.updatedAt = nextTimestamp;
  app.snapshot.items[0].name = 'Locally edited shirt';
  app.records.set('account-a', { state: app.snapshot, cloudUpdatedAt: timestamp });
  await app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  assert.equal(app.context.lastSave.snapshot.items[0].name, 'Locally edited shirt');
  assert.equal(app.context.lastSave.userId, 'account-a');
});

test('a first login fetches the full wardrobe and creates an account cache', async t => {
  let app;
  app = setup({ cloud: async () => ({ data: { state: app.snapshot, updated_at: timestamp }, error: null }) });
  t.after(app.cleanup);
  await app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  await new Promise(setImmediate);
  assert.deepEqual(app.calls, [{ columns: 'state, updated_at', userId: 'account-a' }]);
  assert.equal(app.records.get('account-a').cloudUpdatedAt, timestamp);
  assert.equal(app.elements.get('app-shell').hidden, false);
});

test('an old account response cannot replace the next signed-in account', async t => {
  const pending = new Map();
  const app = setup({ cloud: ({ userId }) => new Promise(resolve => pending.set(userId, resolve)) });
  t.after(app.cleanup);
  const first = app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  await new Promise(setImmediate);
  const second = app.run(`loadAuthenticatedUser({ id: 'account-b' })`);
  await new Promise(setImmediate);
  pending.get('account-b')({ data: { state: app.snapshot, updated_at: timestamp }, error: null });
  await second;
  pending.get('account-a')({ data: { state: { ...app.snapshot, items: [] }, updated_at: timestamp }, error: null });
  await first;
  assert.equal(app.context.lastRenderedUser, 'account-b');
  assert.equal(app.context.lastRenderedState.items.length, 24);
});

test('existing localStorage caches still work when IndexedDB is unavailable', async t => {
  const app = setup({ failDatabase: true, cloud: async () => ({ data: null, error: new Error('Offline') }) });
  t.after(app.cleanup);
  app.local.set('moa-smart-closet-v1:account-a', JSON.stringify(app.snapshot));
  await app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  assert.equal(app.elements.get('app-shell').hidden, false);
  assert.equal(app.run('cloudSaveStatus'), 'error');
  app.context.snapshot = app.snapshot;
  assert.equal(await app.run(`writeAccountCache('account-a', snapshot)`), true);
});
