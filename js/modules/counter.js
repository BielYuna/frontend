let contadorVal = 0;

function atualizarContador() {
  const el = document.getElementById('contVal');
  el.textContent = contadorVal;
  el.style.color = contadorVal < 0 ? '#ef4444' : contadorVal > 0 ? '#10b981' : '#334155';
}

export function incrementar() {
  contadorVal += 1;
  atualizarContador();
}

export function decrementar() {
  contadorVal -= 1;
  atualizarContador();
}

export function resetar() {
  contadorVal = 0;
  atualizarContador();
}

export function definirValor() {
  const v = parseInt(document.getElementById('valorPersonalizado').value, 10);
  if (!isNaN(v)) {
    contadorVal = v;
    atualizarContador();
  }
}

export function initCounter() {
  window.incrementar = incrementar;
  window.decrementar = decrementar;
  window.resetar = resetar;
  window.definirValor = definirValor;
  atualizarContador();
}
