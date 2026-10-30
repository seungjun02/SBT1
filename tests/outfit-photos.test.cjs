const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync('app.js', 'utf8').split('document.addEventListener("visibilitychange"')[0];

function setup() {
  const observations = [];
  const removals = [];
  const context = vm.createContext({
    console, structuredClone, window: {},
    ResizeObserver: class {
      constructor(callback) { context.onResize = callback; }
      observe(frame) { observations.push(frame); }
      unobserve(frame) { removals.push(frame); }
    }
  });
  vm.runInContext(source, context);
  return { context, observations, removals };
}

function imageFor(width, height, rotation = 'auto', naturalWidth = 1600, naturalHeight = 900) {
  const image = {
    complete: true,
    naturalWidth, naturalHeight,
    dataset: { photoRotation: String(rotation) },
    style: {},
    parentElement: { clientWidth: width, clientHeight: height, classList: { contains: name => name === 'outfit-piece' } }
  };
  return image;
}

function assertFits(image) {
  const width = parseFloat(image.style.width);
  const height = parseFloat(image.style.height);
  const rotation = Number(image.style.transform.match(/rotate\(([-\d.]+)deg\)/)[1]) * Math.PI / 180;
  const rotatedWidth = Math.abs(width * Math.cos(rotation)) + Math.abs(height * Math.sin(rotation));
  const rotatedHeight = Math.abs(width * Math.sin(rotation)) + Math.abs(height * Math.cos(rotation));
  assert.ok(rotatedWidth <= image.parentElement.clientWidth + 0.001, 'rotated image must fit horizontally');
  assert.ok(rotatedHeight <= image.parentElement.clientHeight + 0.001, 'rotated image must fit vertically');
  assert.match(image.style.transform, /^translate\(-50%, -50%\)/, 'image must remain centered');
}

test('every saved rotation fits portrait, landscape and square recommendation tiles', () => {
  const { context } = setup();
  for (const [width, height] of [[95, 160], [220, 110], [150, 150]]) {
    for (const rotation of [0, 90, 180, 270]) {
      const image = imageFor(width, height, rotation);
      context.applyImageOrientation(image);
      assertFits(image);
    }
  }
});

test('automatic rotation keeps a landscape garment completely inside a narrow tile', () => {
  const { context } = setup();
  const image = imageFor(100, 160);
  context.applyImageOrientation(image);
  assert.equal(image.style.width, '160px');
  assert.equal(image.style.height, '100px');
  assert.match(image.style.transform, /rotate\(90deg\)/);
  assertFits(image);
});

test('portrait photos retain their upright orientation', () => {
  const { context } = setup();
  const image = imageFor(100, 160, 'auto', 900, 1600);
  context.applyImageOrientation(image);
  assert.match(image.style.transform, /rotate\(0deg\)/);
  assertFits(image);
});

test('a viewport change refits the photos using the resized recommendation tiles', () => {
  const { context, observations } = setup();
  const image = imageFor(100, 160);
  const frame = { isConnected: true, querySelectorAll: () => [image] };
  const root = { querySelectorAll: selector => selector === '.outfit-art' ? [frame] : [image] };
  context.orientWidePhotos(root);
  assert.equal(observations.length, 1);
  image.parentElement.clientWidth = 170;
  image.parentElement.clientHeight = 210;
  context.onResize([{ target: frame }]);
  assert.equal(image.style.width, '210px');
  assert.equal(image.style.height, '170px');
  assertFits(image);
});

test('re-rendering removes observers for discarded cards', () => {
  const { context, removals } = setup();
  const image = imageFor(100, 160);
  const frame = { isConnected: true, querySelectorAll: () => [image] };
  context.orientWidePhotos({ querySelectorAll: selector => selector === '.outfit-art' ? [frame] : [image] });
  frame.isConnected = false;
  context.orientWidePhotos({ querySelectorAll: () => [] });
  assert.deepEqual(removals, [frame]);
});

test('photos outside recommendation cards keep their existing positioning', () => {
  const { context } = setup();
  const image = imageFor(100, 160);
  image.parentElement.classList.contains = () => false;
  context.applyImageOrientation(image);
  assert.equal(image.style.transform, 'rotate(90deg)');
  assert.equal(image.style.width, undefined);
  assert.equal(image.style.height, undefined);
});
