const exercises = [
  { id: '1', icon: '⚖️', label: 'Calculadora de IMC' },
  { id: '2', icon: '✅', label: 'Lista de Tarefas' },
  { id: '3', icon: '🔢', label: 'Contador Interativo' },
  { id: '4', icon: '🌡️', label: 'Conversor de Temp.' },
  { id: '5', icon: '🕐', label: 'Relógio Digital' },
  { id: '6', icon: '❓', label: 'Quiz Interativo' },
  { id: '7', icon: '🎨', label: 'Gerador de Cores' },
  { id: '8', icon: '📋', label: 'Validação de Form.' },
  { id: '9', icon: '🛒', label: 'Carrinho de Compras' },
  { id: '10', icon: '🌤️', label: 'Previsão do Tempo' }
];

let panelHooks = {};
let onPanelChange = null;

export function registerPanelHooks(hooks) {
  panelHooks = hooks || {};
}

export function registerPanelChangeHook(callback) {
  onPanelChange = callback || null;
}

export function showPanel(id, el) {
  document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));

  const panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');
  if (el) el.classList.add('active');

  if (panelHooks[id]) panelHooks[id]();
  if (onPanelChange) onPanelChange(id);
}

export function initNavigation() {
  const grid = document.getElementById('ex-grid');
  if (!grid) return;

  exercises.forEach((e) => {
    const card = document.createElement('div');
    card.className = 'ex-card';
    card.innerHTML = `<div class="ec-ic">${e.icon}</div><div class="ec-n">EXERCÍCIO ${e.id.padStart(2, '0')}</div><h3>${e.label}</h3>`;
    card.onclick = () => showPanel(e.id, document.querySelector(`[data-panel="${e.id}"]`));
    grid.appendChild(card);
  });

  window.showPanel = showPanel;
}
