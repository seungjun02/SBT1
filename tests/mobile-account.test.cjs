const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');
const source = fs.readFileSync('app.js', 'utf8').split('document.addEventListener("visibilitychange"')[0];

function setup(signOut) {
  const button = () => ({ disabled: false, listeners: [], addEventListener(event, fn) { this.listeners.push(fn); } });
  const logoutButtons = [button(), button()];
  const profileButtons = [button(), button()];
  const classes = new Set(['modal-open']);
  const body = { classList: { add: name => classes.add(name), remove: name => classes.delete(name) } };
  const modal = { innerHTML: 'Previous account profile', classList: { remove() {} } };
  const backdrop = { hidden: false, querySelectorAll: () => [] };
  const context = vm.createContext({
    console: { error() {} }, structuredClone, setTimeout, clearTimeout,
    document: {
      body,
      getElementById: id => ({ modal, 'modal-backdrop': backdrop })[id] || null,
      querySelector: () => null,
      querySelectorAll: selector => selector.includes("data-action='logout'") ? logoutButtons
        : selector === "[data-action='profile']" ? profileButtons : []
    }
  });
  vm.runInContext(source, context);
  context.mockSignOut = signOut;
  vm.runInContext(`
    supabaseClient = { auth: { signOut: mockSignOut } };
    activeUser = { id: 'account-a' };
    activeSession = { access_token: 'test-token', user: activeUser };
    syncedUserId = 'account-a';
    clearPendingCloudSave = () => { pendingCloudSave = null; };
    clearClosetOutfitSelections = () => {};
    showAuthScreen = () => { globalThis.loginShown = true; };
    notify = message => { globalThis.notification = message; };
  `, context);
  return { context, logoutButtons, profileButtons, classes, modal, backdrop, run: code => vm.runInContext(code, context) };
}

test('repeated rendering binds each desktop and mobile logout button only once', async () => {
  let requests = 0;
  const app = setup(async () => { requests++; return { error: null }; });
  app.run('bindDynamicEvents(); bindDynamicEvents(); bindDynamicEvents()');
  assert.equal(app.logoutButtons[1].listeners.length, 0);
  assert.equal(typeof app.logoutButtons[1].onclick, 'function');
  assert.equal(typeof app.profileButtons[1].onclick, 'function');
  await app.logoutButtons[1].onclick();
  assert.equal(requests, 1);
  assert.equal(app.context.loginShown, true);
});

test('double tapping logout makes a single request and clears private modal content', async () => {
  let complete;
  let requests = 0;
  const app = setup(() => { requests++; return new Promise(resolve => { complete = resolve; }); });
  const first = app.run('signOut()');
  assert.equal(app.logoutButtons.every(button => button.disabled), true);
  await app.run('signOut()');
  assert.equal(requests, 1);
  complete({ error: null });
  await first;
  assert.equal(app.run('activeUser'), null);
  assert.equal(app.run('activeSession'), null);
  assert.equal(app.backdrop.hidden, true);
  assert.equal(app.modal.innerHTML, '');
  assert.equal(app.classes.has('modal-open'), false);
  assert.equal(app.logoutButtons.every(button => !button.disabled), true);
});

test('a network failure keeps the account signed in and restores logout controls', async () => {
  const app = setup(async () => { throw new Error('Network disconnected'); });
  await app.run('signOut()');
  assert.equal(app.run('activeUser.id'), 'account-a');
  assert.equal(app.run('signOutInProgress'), false);
  assert.equal(app.logoutButtons.every(button => !button.disabled), true);
  assert.match(app.context.notification, /다시 시도/);
});

test('closing a profile dialog restores background scrolling on mobile', () => {
  const app = setup(async () => ({ error: null }));
  app.run('showModal()');
  assert.equal(app.classes.has('modal-open'), true);
  app.run('closeModal()');
  assert.equal(app.classes.has('modal-open'), false);
  assert.equal(app.backdrop.hidden, true);
});
