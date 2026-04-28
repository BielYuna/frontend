function setFieldState(inputId, errId, msg) {
  const inp = document.getElementById(inputId);
  const err = document.getElementById(errId);

  if (msg) {
    inp.classList.remove('ok');
    inp.classList.add('err');
    err.textContent = msg;
    return false;
  }

  inp.classList.remove('err');
  inp.classList.add('ok');
  err.textContent = '';
  return true;
}

export function validarNome() {
  const v = document.getElementById('f-nome').value.trim();
  if (!v) return setFieldState('f-nome', 'erroNome', 'Nome é obrigatório.');
  if (v.split(/\s+/).filter(Boolean).length < 2) return setFieldState('f-nome', 'erroNome', 'Informe pelo menos nome e sobrenome.');
  return setFieldState('f-nome', 'erroNome', '');
}

export function validarEmail() {
  const v = document.getElementById('f-email').value.trim();
  if (!v) return setFieldState('f-email', 'erroEmail', 'E-mail é obrigatório.');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(v)) return setFieldState('f-email', 'erroEmail', 'Informe um e-mail válido.');
  return setFieldState('f-email', 'erroEmail', '');
}

export function validarSenha() {
  const v = document.getElementById('f-senha').value;
  const bar = document.getElementById('ps-bar');

  let force = 0;
  if (v.length >= 6) force += 1;
  if (/[A-Z]/.test(v)) force += 1;
  if (/[0-9]/.test(v)) force += 1;
  if (/[^A-Za-z0-9]/.test(v)) force += 1;

  const pcts = [0, 25, 50, 75, 100];
  const bgs = ['#ef4444', '#ef4444', '#f59e0b', '#84cc16', '#10b981'];
  bar.style.width = pcts[force] + '%';
  bar.style.background = bgs[force];

  if (!v) return setFieldState('f-senha', 'erroSenha', 'Senha é obrigatória.');
  if (v.length < 6) return setFieldState('f-senha', 'erroSenha', 'Mínimo 6 caracteres.');
  return setFieldState('f-senha', 'erroSenha', '');
}

export function validarConfirma() {
  const s = document.getElementById('f-senha').value;
  const c = document.getElementById('f-confirma').value;
  if (!c) return setFieldState('f-confirma', 'erroConfirma', 'Confirme sua senha.');
  if (s !== c) return setFieldState('f-confirma', 'erroConfirma', 'As senhas não coincidem.');
  return setFieldState('f-confirma', 'erroConfirma', '');
}

export function validarFormulario(e) {
  e.preventDefault();
  const ok = [validarNome(), validarEmail(), validarSenha(), validarConfirma()].every(Boolean);
  const succ = document.getElementById('form-success');

  if (ok) {
    succ.style.display = 'block';
    setTimeout(() => {
      succ.style.display = 'none';
    }, 4000);
  }
}

export function initFormValidation() {
  window.validarNome = validarNome;
  window.validarEmail = validarEmail;
  window.validarSenha = validarSenha;
  window.validarConfirma = validarConfirma;
  window.validarFormulario = validarFormulario;
}
