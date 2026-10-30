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
  const elements = new Map(['auth-screen', 'app-shell', 'account-load-status'].map(id => [id, {
    hidden: id === 'app-shell', innerHTML: '', textContent: '',
    querySelector() { return { addEventListener() {} }; }
  }]));
  const calls = [];
  const timers = new Set();
  const scheduled = [];
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
    setTimeout(fn, ms) { const id = setTimeout(fn, ms === 750 ? 1 : ms); if (ms !== 750) id.unref(); timers.add(id); scheduled.push({ fn, ms }); return id; },
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
        retry(enabled) { assert.equal(enabled, false); return query; },
        abortSignal(signal) { calls.push({ columns, userId }); return cloud({ columns, userId, signal }); }
      };
      return query;
    }
  };
  vm.runInContext(`
    globalThis.originalShowAccountLoadError = showAccountLoadError;
    supabaseClient = testClient;
    closetDataClient = testClient;
    activeSession = { access_token: 'test-token-a', user: { id: 'account-a' } };
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
  return { context, records, local, elements, calls, run, snapshot, scheduled, cleanup: () => timers.forEach(clearTimeout) };
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
  app.run(`activeSession = { access_token: 'test-token-b', user: { id: 'account-b' } }`);
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

test('a temporary server error is retried once and can recover without another login', async t => {
  let attempts = 0;
  let app;
  app = setup({ cloud: async () => ++attempts === 1
    ? { data: null, error: { message: 'Service unavailable' }, status: 503 }
    : { data: { state: app.snapshot, updated_at: timestamp }, error: null, status: 200 } });
  t.after(app.cleanup);
  await app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  assert.equal(attempts, 2);
  assert.equal(app.run('syncedUserId'), 'account-a');
  assert.equal(app.run('lastAccountLoadError'), null);
});

test('permission failures stop immediately and leave a manual retry available', async t => {
  let failing = true;
  let app;
  app = setup({ cloud: async () => failing
    ? { data: null, error: { message: 'permission denied', code: '42501' }, status: 403 }
    : { data: { state: app.snapshot, updated_at: timestamp }, error: null, status: 200 } });
  t.after(app.cleanup);
  await app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  assert.equal(app.calls.length, 1);
  assert.equal(app.run('accountLoadPromise'), null);
  assert.equal(app.context.loadError, 'permission denied');
  assert.equal(app.run('lastAccountLoadError.message'), 'permission denied');
  failing = false;
  await app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  assert.equal(app.run('syncedUserId'), 'account-a');
  assert.equal(app.run('lastAccountLoadError'), null);
});

test('persistent network failures stop after two attempts instead of looping', async t => {
  const app = setup({ cloud: async () => ({ data: null, error: { message: 'TypeError: Failed to fetch' }, status: 0 }) });
  t.after(app.cleanup);
  await app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  assert.equal(app.calls.length, 2);
  assert.equal(app.context.loadError, 'TypeError: Failed to fetch');
  assert.equal(app.run('accountLoadPromise'), null);
});

test('data requests use the delivered session and do not call the auth client', async t => {
  let app;
  app = setup({ cloud: async () => ({ data: { state: app.snapshot, updated_at: timestamp }, error: null }) });
  t.after(app.cleanup);
  app.run(`supabaseClient = { from() { throw new Error('Auth lock must not be acquired'); }, auth: { getSession() { throw new Error('Auth lock must not be acquired'); } } }`);
  await app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  assert.equal(app.run('syncedUserId'), 'account-a');
  assert.equal(app.calls.length, 1);
});

test('a session from another account cannot be used for wardrobe requests', async t => {
  const app = setup({ cloud: async () => { throw new Error('Must not fetch'); } });
  t.after(app.cleanup);
  app.run(`activeSession = { access_token: 'test-token-b', user: { id: 'account-b' } }`);
  await app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  assert.equal(app.calls.length, 0);
  assert.match(app.context.loadError, /다시 로그인/);
});

test('focus auth events do not restart a failed load or hide the error', async t => {
  const app = setup({ cloud: async () => ({ data: null, error: { message: 'permission denied' }, status: 403 }) });
  t.after(app.cleanup);
  app.context.createClientCalls = [];
  app.context.window.MOA_SUPABASE_CONFIG = { url: 'https://example.supabase.co', anonKey: 'test-public-key' };
  app.context.window.supabase = {
    createClient(url, key, options) {
      app.context.createClientCalls.push(options);
      if (options?.accessToken) return app.context.testClient;
      return { auth: {
        onAuthStateChange(callback) { app.context.authCallback = callback; },
        async getSession() { return { data: { session: { access_token: 'test-token-a', user: { id: 'account-a' } } }, error: null }; }
      } };
    }
  };
  app.run('showAuthScreen = () => {}');
  await app.run('initializeAuthentication()');
  assert.equal(app.calls.length, 1);
  app.context.authCallback('SIGNED_IN', { access_token: 'refreshed-test-token', user: { id: 'account-a' } });
  await new Promise(setImmediate);
  assert.equal(app.calls.length, 1);
  assert.equal(await app.context.createClientCalls[1].accessToken(), 'refreshed-test-token');
  assert.equal(app.context.loadError, 'permission denied');
});

test('load errors remain visible even if the application shell was already displayed', t => {
  const app = setup();
  t.after(app.cleanup);
  app.elements.get('auth-screen').hidden = true;
  app.elements.get('app-shell').hidden = false;
  app.run(`originalShowAccountLoadError({ message: 'Connection failed', code: 'TEST_CODE' })`);
  assert.equal(app.elements.get('auth-screen').hidden, false);
  assert.equal(app.elements.get('app-shell').hidden, true);
  assert.match(app.elements.get('auth-screen').innerHTML, /Connection failed/);
  assert.match(app.elements.get('auth-screen').innerHTML, /TEST_CODE/);
});

test('requests that never respond are aborted and stop after the second timeout', async t => {
  const signals = [];
  const app = setup({ cloud: ({ signal }) => { signals.push(signal); return new Promise(() => {}); } });
  t.after(app.cleanup);
  const login = app.run(`loadAuthenticatedUser({ id: 'account-a' })`);
  await new Promise(setImmediate);
  app.scheduled.find(timer => timer.ms === 45000).fn();
  await new Promise(resolve => setTimeout(resolve, 20));
  assert.equal(app.calls.length, 2);
  app.scheduled.filter(timer => timer.ms === 45000)[1].fn();
  await login;
  assert.equal(signals.every(signal => signal.aborted), true);
  assert.equal(app.calls.length, 2);
  assert.match(app.context.loadError, /응답 시간이 초과/);
  assert.equal(app.run('accountLoadPromise'), null);
});
