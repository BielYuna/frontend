const MIN_C = -17.8;
const MAX_C = 100;

function clampCelsius(value) {
  return Math.min(MAX_C, Math.max(MIN_C, value));
}

function cToF(c) {
  const fahrenheit = c * 9 / 5 + 32;
  return Math.max(0, fahrenheit).toFixed(1);
}

function atualizarTemp(c) {
  document.getElementById('fahrenheitDisplay').textContent = cToF(c) + '°F';
  const vis = document.getElementById('tempVisual');

  if (c <= 0) {
    vis.style.background = '#dbeafe';
    vis.style.color = '#1e40af';
    vis.textContent = `❄️ ${c}°C — Muito frio!`;
  } else if (c <= 10) {
    vis.style.background = '#e0f2fe';
    vis.style.color = '#0369a1';
    vis.textContent = `🥶 ${c}°C — Frio`;
  } else if (c <= 20) {
    vis.style.background = '#ecfccb';
    vis.style.color = '#3f6212';
    vis.textContent = `😊 ${c}°C — Agradável`;
  } else if (c <= 30) {
    vis.style.background = '#fef9c3';
    vis.style.color = '#854d0e';
    vis.textContent = `☀️ ${c}°C — Quente`;
  } else {
    vis.style.background = '#fee2e2';
    vis.style.color = '#b91c1c';
    vis.textContent = `🔥 ${c}°C — Muito quente!`;
  }
}

export function syncFromInput() {
  const input = document.getElementById('celsius');
  const c = parseFloat(input.value);
  const slider = document.getElementById('slider');
  if (!isNaN(c)) {
    const clamped = clampCelsius(c);
    input.value = clamped;
    slider.value = clamped;
    atualizarTemp(clamped);
  }
}

export function syncFromSlider() {
  const slider = document.getElementById('slider');
  const c = parseFloat(slider.value);
  const clamped = clampCelsius(c);
  slider.value = clamped;
  document.getElementById('celsius').value = clamped;
  atualizarTemp(clamped);
}

export function initTemperature() {
  window.syncFromInput = syncFromInput;
  window.syncFromSlider = syncFromSlider;

  document.getElementById('celsius').value = 0;
  syncFromSlider();
}
