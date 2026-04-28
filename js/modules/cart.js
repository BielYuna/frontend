const produtos = [
  { id: 1, nome: 'Camiseta Básica', preco: 29.9, emoji: '👕' },
  { id: 2, nome: 'Calça Jeans', preco: 89.9, emoji: '👖' },
  { id: 3, nome: 'Tênis Casual', preco: 149.9, emoji: '👟' },
  { id: 4, nome: 'Boné', preco: 39.9, emoji: '🧢' },
  { id: 5, nome: 'Mochila', preco: 119.9, emoji: '🎒' },
  { id: 6, nome: 'Óculos de Sol', preco: 59.9, emoji: '🕶️' }
];

let carrinho = JSON.parse(localStorage.getItem('jsAcademyCart') || '[]');

// Persiste estado do carrinho no navegador.
function salvarCarrinho() {
  localStorage.setItem('jsAcademyCart', JSON.stringify(carrinho));
}

// Adiciona item ao carrinho (ou incrementa quantidade se já existir).
export function adicionarAoCarrinho(id) {
  const item = carrinho.find((i) => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    const p = produtos.find((prod) => prod.id === id);
    if (p) carrinho.push({ ...p, qty: 1 });
  }
  salvarCarrinho();
  renderCart();
}

// Remove uma unidade do item; exclui quando a quantidade chega a zero.
export function removerDoCarrinho(id) {
  const item = carrinho.find((i) => i.id === id);
  if (!item) return;

  if (item.qty > 1) {
    item.qty -= 1;
  } else {
    carrinho = carrinho.filter((i) => i.id !== id);
  }

  salvarCarrinho();
  renderCart();
}

// Limpa todos os itens do carrinho.
export function limparCarrinho() {
  carrinho = [];
  salvarCarrinho();
  renderCart();
}

// Renderiza lista de produtos, itens no carrinho e total de compra.
export function renderCart() {
  const pg = document.getElementById('produtosGrid');
  if (pg) {
    pg.innerHTML = '';
    produtos.forEach((p) => {
      const div = document.createElement('div');
      div.className = 'prod-card';
      div.innerHTML = `
        <div class="prod-info">
          <h4>${p.emoji} ${p.nome}</h4>
          <span>R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
        </div>
        <button class="btn btn-p" style="padding:7px 14px;font-size:12px" onclick="adicionarAoCarrinho(${p.id})">+ Adicionar</button>`;
      pg.appendChild(div);
    });
  }

  const ul = document.getElementById('itensCarrinho');
  const emptyMsg = document.getElementById('cart-empty');
  ul.innerHTML = '';

  if (carrinho.length === 0) {
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
    carrinho.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cart-line';
      li.innerHTML = `
        <div class="cart-line-info">
          <strong>${item.emoji} ${item.nome}</strong>
          <span>x${item.qty} — R$ ${(item.preco * item.qty).toFixed(2).replace('.', ',')}</span>
        </div>
        <button class="btn btn-d" style="padding:4px 9px;font-size:11px" onclick="removerDoCarrinho(${item.id})">−</button>`;
      ul.appendChild(li);
    });
  }

  const total = carrinho.reduce((s, i) => s + i.preco * i.qty, 0);
  document.getElementById('total').textContent = total.toFixed(2).replace('.', ',');
  const qtd = carrinho.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = qtd;
}

// Expõe ações globais e inicia render com dados do localStorage.
export function initCart() {
  window.adicionarAoCarrinho = adicionarAoCarrinho;
  window.removerDoCarrinho = removerDoCarrinho;
  window.limparCarrinho = limparCarrinho;
  renderCart();
}
