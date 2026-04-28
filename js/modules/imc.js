export function calcularIMC() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const res = document.getElementById('imc-res');

  if (!peso || !altura || peso <= 0 || altura <= 0) {
    res.style.display = 'block';
    res.style.background = '#fee2e2';
    res.style.color = '#b91c1c';
    res.textContent = '⚠️ Preencha peso e altura corretamente.';
    return;
  }

  const imc = peso / (altura * altura);
  let classe;
  let bg;
  let color;

  if (imc < 18.5) {
    classe = 'Abaixo do peso';
    bg = '#dbeafe';
    color = '#1d4ed8';
  } else if (imc < 25) {
    classe = 'Peso normal ✅';
    bg = '#dcfce7';
    color = '#15803d';
  } else if (imc < 30) {
    classe = 'Sobrepeso';
    bg = '#fef9c3';
    color = '#854d0e';
  } else if (imc < 35) {
    classe = 'Obesidade Grau I';
    bg = '#ffedd5';
    color = '#c2410c';
  } else if (imc < 40) {
    classe = 'Obesidade Grau II';
    bg = '#fee2e2';
    color = '#b91c1c';
  } else {
    classe = 'Obesidade Grau III';
    bg = '#fce7f3';
    color = '#9d174d';
  }

  res.style.display = 'block';
  res.style.background = bg;
  res.style.color = color;
  res.innerHTML = `IMC: <strong>${imc.toFixed(2)}</strong> — ${classe}`;
}

export function initIMC() {
  window.calcularIMC = calcularIMC;
}
