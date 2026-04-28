let clockInterval = null;
let formato24h = true;

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

export function startClock() {
  if (clockInterval) return;
  tickClock();
  clockInterval = setInterval(tickClock, 1000);
}

export function alternarFormato() {
  formato24h = !formato24h;
  tickClock();
}

export function initClock() {
  window.alternarFormato = alternarFormato;
}
