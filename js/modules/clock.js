let clockInterval = null;
let formato24h = true;

// Atualiza hora/data na interface respeitando o formato ativo (12h ou 24h).
function tickClock() {
  const agora = new Date();
  let h = agora.getHours();
  const m = String(agora.getMinutes()).padStart(2, '0');
  const s = String(agora.getSeconds()).padStart(2, '0');

  let periodo = '';
  if (!formato24h) {
    periodo = h >= 12 ? ' PM' : ' AM';
    h = h % 12 || 12;
  }

  document.getElementById('clock-time').textContent = `${String(h).padStart(2, '0')}:${m}:${s}`;
  document.getElementById('clock-period').textContent = periodo;

  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const dia = agora.getDate();
  const mes = meses[agora.getMonth()];
  const ano = agora.getFullYear();
  const dow = dias[agora.getDay()];

  document.getElementById('clock-date').textContent = `${dow}, ${dia} de ${mes} de ${ano}`;
}

// Inicia atualização contínua do relógio e evita múltiplos intervalos.
export function startClock() {
  if (clockInterval) return;
  tickClock();
  clockInterval = setInterval(tickClock, 1000);
}

// Alterna entre formato 12h e 24h.
export function alternarFormato() {
  formato24h = !formato24h;
  tickClock();
}

// Expõe a ação de alternar formato para o botão do HTML.
export function initClock() {
  window.alternarFormato = alternarFormato;
}
