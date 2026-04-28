let tarefas = [];

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderTarefas() {
  const ul = document.getElementById('listaTarefas');
  ul.innerHTML = '';

  tarefas.forEach((tarefa) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (tarefa.done ? ' done' : '');
    li.innerHTML = `
      <span class="todo-text">${escapeHtml(tarefa.texto)}</span>
      <div class="todo-acts">
        <button class="btn btn-s" style="padding:5px 11px;font-size:12px" onclick="toggleTarefa(${tarefa.id})">${tarefa.done ? '↩️' : '✔️'}</button>
        <button class="btn btn-d" style="padding:5px 11px;font-size:12px" onclick="removerTarefa(${tarefa.id})">🗑️</button>
      </div>`;
    ul.appendChild(li);
  });

  const pendentes = tarefas.filter((t) => !t.done).length;
  document.getElementById('tot-total').textContent = tarefas.length;
  document.getElementById('tot-pend').textContent = pendentes;
  document.getElementById('tot-done').textContent = tarefas.length - pendentes;
}

export function adicionarTarefa() {
  const input = document.getElementById('novaTarefa');
  const texto = input.value.trim();
  if (!texto) return;

  tarefas.push({ id: Date.now(), texto, done: false });
  input.value = '';
  renderTarefas();
}

export function toggleTarefa(id) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (tarefa) tarefa.done = !tarefa.done;
  renderTarefas();
}

export function removerTarefa(id) {
  tarefas = tarefas.filter((t) => t.id !== id);
  renderTarefas();
}

export function initTodo() {
  window.adicionarTarefa = adicionarTarefa;
  window.toggleTarefa = toggleTarefa;
  window.removerTarefa = removerTarefa;
  renderTarefas();
}
