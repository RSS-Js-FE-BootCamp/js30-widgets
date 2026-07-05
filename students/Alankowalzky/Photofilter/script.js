'use strict';

/*
 * Photofilter – script.js
 * Stage 4: extra CSS filters + preset thumbnails
 * Pure vanilla JavaScript – no frameworks, no libraries
 */

// ── Filter definitions ────────────────────────────────────────
const FILTER_DEFS = [
  { name: 'blur',        label: 'Blur',        unit: 'px',  min: 0,   max: 25,  step: 0.5, defaultVal: 0    },
  { name: 'brightness',  label: 'Brightness',  unit: '%',   min: 50,  max: 200, step: 1,   defaultVal: 100  },
  { name: 'contrast',    label: 'Contrast',    unit: '%',   min: 50,  max: 200, step: 1,   defaultVal: 100  },
  { name: 'saturate',    label: 'Saturate',    unit: '%',   min: 0,   max: 300, step: 1,   defaultVal: 100  },
  { name: 'hue-rotate',  label: 'Hue Rotate',  unit: 'deg', min: 0,   max: 360, step: 1,   defaultVal: 0    },
  { name: 'sepia',       label: 'Sepia',       unit: '%',   min: 0,   max: 100, step: 1,   defaultVal: 0    },
  { name: 'grayscale',   label: 'Grayscale',   unit: '%',   min: 0,   max: 100, step: 1,   defaultVal: 0    },
  { name: 'invert',      label: 'Invert',      unit: '%',   min: 0,   max: 100, step: 1,   defaultVal: 0,   extra: true },
  { name: 'opacity',     label: 'Opacity',     unit: '%',   min: 0,   max: 100, step: 1,   defaultVal: 100, extra: true },
];

// ── Preset definitions ────────────────────────────────────────
const PRESETS = [
  { name: 'Original', filters: {} },
  { name: 'Vintage',  filters: { sepia: 70, contrast: 115, brightness: 108, saturate: 75 } },
  { name: 'B&W',      filters: { grayscale: 100, contrast: 130, brightness: 95 } },
  { name: 'Cool',     filters: { 'hue-rotate': 200, saturate: 160, brightness: 110 } },
  { name: 'Dramatic', filters: { contrast: 185, brightness: 80, saturate: 140 } },
  { name: 'Dreamy',   filters: { blur: 2, brightness: 125, saturate: 75, opacity: 88 } },
  { name: 'Warm',     filters: { 'hue-rotate': 25, saturate: 140, brightness: 108 } },
  { name: 'Night',    filters: { brightness: 65, contrast: 140, saturate: 80, 'hue-rotate': 220 } },
  { name: 'X-Ray',    filters: { invert: 100, grayscale: 60, contrast: 140 } },
];

// ── State ─────────────────────────────────────────────────────
const state = {
  filterValues: buildDefaultFilters(),
  activePreset: 0,
};

function buildDefaultFilters() {
  const obj = {};
  FILTER_DEFS.forEach(def => { obj[def.name] = def.defaultVal; });
  return obj;
}

function resolvePresetFilters(preset) {
  const values = buildDefaultFilters();
  Object.assign(values, preset.filters);
  return values;
}

// ── DOM references ─────────────────────────────────────────────
const slidersContainer = document.getElementById('sliders-container');
const presetsContainer = document.getElementById('presets-container');

// ── Build slider UI ────────────────────────────────────────────
function buildSliders() {
  FILTER_DEFS.forEach(def => {
    const group = document.createElement('div');
    group.className = 'slider-group';

    const row = document.createElement('div');
    row.className = 'slider-row';

    const nameEl = document.createElement('span');
    nameEl.className = 'slider-name';
    nameEl.textContent = def.label;
    if (def.extra) {
      const badge = document.createElement('sup');
      badge.className = 'slider-badge';
      badge.textContent = 'extra';
      nameEl.appendChild(badge);
    }

    const valueEl = document.createElement('span');
    valueEl.className = 'slider-value';
    valueEl.id = `value-${def.name}`;
    valueEl.textContent = `${def.defaultVal}${def.unit}`;

    row.appendChild(nameEl);
    row.appendChild(valueEl);

    const input = document.createElement('input');
    input.type           = 'range';
    input.id             = `slider-${def.name}`;
    input.name           = def.name;
    input.min            = def.min;
    input.max            = def.max;
    input.step           = def.step;
    input.value          = def.defaultVal;
    input.dataset.sizing = def.unit;

    group.appendChild(row);
    group.appendChild(input);
    slidersContainer.appendChild(group);
  });
}

// ── CSS custom property update (core JS30 pattern) ─────────────
function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  const value  = parseFloat(this.value);

  state.filterValues[this.name] = value;

  const valueEl = document.getElementById(`value-${this.name}`);
  if (valueEl) valueEl.textContent = `${value}${suffix}`;

  document.documentElement.style.setProperty(`--${this.name}`, value + suffix);

  state.activePreset = null;
  updateActivePreset();
}

// ── Presets ────────────────────────────────────────────────────
function buildPresets() {
  PRESETS.forEach((preset, index) => {
    const card = document.createElement('div');
    card.className = 'preset-card' + (index === 0 ? ' active' : '');
    card.addEventListener('click', () => applyPreset(index));

    const thumb = document.createElement('img');
    thumb.className    = 'preset-thumb';
    thumb.alt          = preset.name;
    thumb.crossOrigin  = 'anonymous';
    thumb.src          = 'https://picsum.photos/seed/photofilter-a/900/600';
    thumb.style.filter = buildFilterString(resolvePresetFilters(preset));

    const label = document.createElement('span');
    label.className   = 'preset-name';
    label.textContent = preset.name;

    card.appendChild(thumb);
    card.appendChild(label);
    presetsContainer.appendChild(card);
  });
}

function applyPreset(index) {
  const values = resolvePresetFilters(PRESETS[index]);

  FILTER_DEFS.forEach(def => {
    const val = values[def.name];
    state.filterValues[def.name] = val;

    const slider  = document.getElementById(`slider-${def.name}`);
    const valueEl = document.getElementById(`value-${def.name}`);
    if (slider)  slider.value = val;
    if (valueEl) valueEl.textContent = `${val}${def.unit}`;

    document.documentElement.style.setProperty(`--${def.name}`, val + def.unit);
  });

  state.activePreset = index;
  updateActivePreset();
}

function updateActivePreset() {
  presetsContainer.querySelectorAll('.preset-card').forEach((card, i) => {
    card.classList.toggle('active', i === state.activePreset);
  });
}

function buildFilterString(values) {
  return FILTER_DEFS
    .map(def => `${def.name}(${values[def.name]}${def.unit})`)
    .join(' ');
}

// ── Init ──────────────────────────────────────────────────────
function init() {
  buildSliders();
  buildPresets();

  // JS30 canonical pattern: querySelectorAll → forEach → addEventListener
  const inputs = document.querySelectorAll('.controls input');
  inputs.forEach(input => input.addEventListener('change', handleUpdate));
  inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
}

init();