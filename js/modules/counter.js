let contadorVal = 0;

// Atualiza número exibido e cor conforme sinal do valor.
function atualizarContador() {
  const el = document.getElementById('contVal');
  el.textContent = contadorVal;
  el.style.color = contadorVal < 0 ? '#ef4444' : contadorVal > 0 ? '#10b981' : '#334155';
}

// Incrementa o contador em 1.
export function incrementar() {
  contadorVal += 1;
  atualizarContador();
}

// Decrementa o contador em 1.
export function decrementar() {
  contadorVal -= 1;
  atualizarContador();
}

// Retorna o contador para zero.
export function resetar() {
  contadorVal = 0;
  atualizarContador();
}

// Define o contador com um valor digitado pelo usuário.
export function definirValor() {
  const v = parseInt(document.getElementById('valorPersonalizado').value, 10);
  if (!isNaN(v)) {
    contadorVal = v;
    atualizarContador();
  }
}

// Registra funções globais para integração com o HTML.
export function initCounter() {
  window.incrementar = incrementar;
  window.decrementar = decrementar;
  window.resetar = resetar;
  window.definirValor = definirValor;
  atualizarContador();
}
