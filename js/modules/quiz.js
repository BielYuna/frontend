const perguntas = [
  { q: 'Qual é o resultado de <code>typeof null</code>?', opts: ['null', 'undefined', 'object', 'string'], c: 2 },
  { q: 'Qual método adiciona um elemento ao <strong>final</strong> de um array?', opts: ['push()', 'pop()', 'shift()', 'unshift()'], c: 0 },
  { q: 'O que significa a sigla <strong>DOM</strong>?', opts: ['Data Object Model', 'Document Object Model', 'Dynamic Object Model', 'Document Oriented Markup'], c: 1 },
  { q: 'Qual operador realiza comparação <strong>estrita</strong> (tipo + valor)?', opts: ['==', '=', '===', '!='], c: 2 },
  { q: 'Qual função converte uma string em número <strong>inteiro</strong>?', opts: ['parseFloat()', 'Number()', 'parseInt()', 'toInt()'], c: 2 },
  { q: 'O que faz o método <code>Array.prototype.map()</code>?', opts: ['Filtra elementos', 'Reduz o array a um valor', 'Transforma cada elemento e retorna novo array', 'Ordena o array'], c: 2 },
  { q: 'Qual é o escopo de uma variável declarada com <code>var</code>?', opts: ['Bloco', 'Função', 'Sempre global', 'Módulo'], c: 1 },
  { q: 'Como se declara uma <strong>função de seta</strong> em JavaScript?', opts: ['function() {}', '=> {}', '() -> {}', '() => {}'], c: 3 }
];

let qIdx = 0;
let qScore = 0;
let qRespondida = false;

// Renderiza pergunta atual, opções e estado visual do progresso.
function renderPergunta() {
  const p = perguntas[qIdx];
  document.getElementById('quiz-counter').textContent = `Pergunta ${qIdx + 1} de ${perguntas.length}`;
  document.getElementById('pontuacao').textContent = qScore;
  document.getElementById('quiz-prog-fill').style.width = (qIdx / perguntas.length) * 100 + '%';
  document.getElementById('pergunta').innerHTML = p.q;
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-feedback').className = 'quiz-feedback';
  document.getElementById('btn-proxima').style.display = 'none';
  document.getElementById('quiz-end').style.display = 'none';

  const opts = document.getElementById('opcoes');
  opts.innerHTML = '';
  p.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.innerHTML = o;
    btn.onclick = () => responder(i);
    opts.appendChild(btn);
  });

  qRespondida = false;
}

// Processa a resposta escolhida, aplica feedback e atualiza pontuação.
function responder(idx) {
  if (qRespondida) return;
  qRespondida = true;

  const p = perguntas[qIdx];
  const btns = document.querySelectorAll('.quiz-opt');
  btns.forEach((b) => {
    b.disabled = true;
  });

  btns[p.c].classList.add('correct');
  const fb = document.getElementById('quiz-feedback');

  if (idx === p.c) {
    qScore += 1;
    document.getElementById('pontuacao').textContent = qScore;
    btns[idx].classList.add('correct');
    fb.textContent = '✅ Resposta correta! +1 ponto';
    fb.className = 'quiz-feedback ac';
  } else {
    btns[idx].classList.add('wrong');
    fb.textContent = '❌ Resposta incorreta!';
    fb.className = 'quiz-feedback er';
  }

  document.getElementById('btn-proxima').style.display = 'inline-block';
}

// Avança o quiz e mostra tela final quando acabar.
export function proximaPergunta() {
  qIdx += 1;

  if (qIdx >= perguntas.length) {
    document.getElementById('quiz-prog-fill').style.width = '100%';
    document.getElementById('opcoes').innerHTML = '';
    document.getElementById('pergunta').textContent = '';
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('btn-proxima').style.display = 'none';
    document.getElementById('pontuacao').textContent = qScore;

    const end = document.getElementById('quiz-end');
    end.style.display = 'block';

    const pct = Math.round((qScore / perguntas.length) * 100);
    document.getElementById('q-icon').textContent = pct >= 75 ? '🏆' : pct >= 50 ? '👍' : '📚';
    document.getElementById('q-end-title').textContent = pct >= 75 ? 'Excelente!' : pct >= 50 ? 'Bom trabalho!' : 'Continue praticando!';
    document.getElementById('q-end-sub').innerHTML = `Você acertou <strong>${qScore} de ${perguntas.length}</strong> perguntas (${pct}%).`;
  } else {
    renderPergunta();
  }
}

// Reinicia estado do quiz para uma nova rodada.
export function reiniciarQuiz() {
  qIdx = 0;
  qScore = 0;
  renderPergunta();
}

// Expõe ações globais e faz o primeiro render.
export function initQuiz() {
  window.proximaPergunta = proximaPergunta;
  window.reiniciarQuiz = reiniciarQuiz;
  renderPergunta();
}
