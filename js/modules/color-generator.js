export function atualizarCor() {
  const r = parseInt(document.getElementById('sldr-r').value, 10);
  const g = parseInt(document.getElementById('sldr-g').value, 10);
  const b = parseInt(document.getElementById('sldr-b').value, 10);

  document.getElementById('vr').textContent = r;
  document.getElementById('vg').textContent = g;
  document.getElementById('vb').textContent = b;

  const hex = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
  document.getElementById('colorBox').style.background = hex;
  document.getElementById('hexVal').textContent = hex.toUpperCase();
  document.getElementById('rgbVal').textContent = `RGB(${r}, ${g}, ${b})`;
}

export function gerarCorAleatoria() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  document.getElementById('sldr-r').value = r;
  document.getElementById('sldr-g').value = g;
  document.getElementById('sldr-b').value = b;

  atualizarCor();
}

export function copiarHex() {
  const hex = document.getElementById('hexVal').textContent;
  navigator.clipboard.writeText(hex).then(() => {
    const msg = document.getElementById('copied-msg');
    msg.textContent = `✅ ${hex} copiado para a área de transferência!`;
    setTimeout(() => {
      msg.textContent = '';
    }, 2500);
  }).catch(() => {
    document.getElementById('copied-msg').textContent = 'Não foi possível copiar automaticamente.';
  });
}

export function initColorGenerator() {
  window.atualizarCor = atualizarCor;
  window.gerarCorAleatoria = gerarCorAleatoria;
  window.copiarHex = copiarHex;
  atualizarCor();
}
