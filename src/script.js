// ========== CARRINHO DE COMPRAS ==========
let cart = [];

function adicionarAoCarrinho(product) {
  const itemExistente = cart.find(item => item.id === product.id);

  if (itemExistente) {
    itemExistente.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  abrirModalCarrinho();
}

function removerDoCarrinho(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function alterarQuantidade(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartSummary = document.getElementById('cart-summary');
  const cartCount = document.getElementById('cart-count');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');

  if (!cartItemsContainer || !emptyCartMessage || !cartSummary || !cartCount) return;

  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    emptyCartMessage.classList.remove('hidden');
    cartSummary.classList.add('hidden');
    cartCount.textContent = '0';
  } else {
    emptyCartMessage.classList.add('hidden');
    cartSummary.classList.remove('hidden');
    let subtotal = 0;

    cart.forEach(item => {
      subtotal += item.price * item.quantity;

      const div = document.createElement('div');
      div.className = 'flex justify-between items-center mb-2';
      div.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <div class="flex gap-2">
          <button data-id="${item.id}" class="decrease-quantity text-red-500 hover:text-red-700">-</button>
          <span>R$ ${(item.price * item.quantity).toFixed(1)}</span>
          <button data-id="${item.id}" class="increase-quantity text-green-500 hover:text-green-700">+</button>
          <button data-id="${item.id}" class="remove-item text-gray-400 hover:text-gray-600 ml-3">×</button>
        </div>
      `;
      cartItemsContainer.appendChild(div);
    });

    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartSubtotal.textContent = `R$ ${subtotal.toFixed(1)}`;
    cartTotal.textContent = `R$ ${subtotal.toFixed(1)}`;
  }
}

// Eventos dos cards de produto
document.addEventListener('click', function (e) {
  const botao = e.target.closest('.add-to-cart');
  if (botao) {
    const product = {
      id: botao.dataset.id,
      name: botao.dataset.name,
      price: parseFloat(botao.dataset.price),
      image: botao.dataset.image,
      quantity: 1
    };
    adicionarAoCarrinho(product);
  }
});

// Eventos dos botões dentro do carrinho (+, -, ×)
document.getElementById('cart-items')?.addEventListener('click', function (e) {
  const target = e.target;

  if (!target) return;

  const id = target.dataset.id;

  // Aumentar quantidade
  if (target.classList.contains('increase-quantity')) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity += 1;
      updateCart();
    }
  }

  // Diminuir quantidade
  if (target.classList.contains('decrease-quantity')) {
    const item = cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      updateCart();
    }
  }

  // Remover item
  if (target.classList.contains('remove-item')) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
  }
});

// Abrir modal do carrinho
function abrirModalCarrinho() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.remove('hidden');
  }
}

// Botão do Carrinho na Navbar
const cartButton = document.getElementById('open-cart');
if (cartButton) {
  cartButton.addEventListener('click', () => {
    abrirModalCarrinho();
  });
}

// Fechar modal do carrinho
const closeCart = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
if (closeCart && cartModal) {
  closeCart.addEventListener('click', () => {
    cartModal.classList.add('hidden');
  });
}

// Limpar carrinho
window.limparCarrinho = function () {
  cart = [];
  updateCart();
};

// Finalizar compra
const btnFinalizar = document.getElementById('btn-finalizar');
if (btnFinalizar) {
  btnFinalizar.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Compra finalizada com sucesso!");
    cart = [];
    updateCart();
    cartModal.classList.add('hidden');
  });
}

document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = {
    nome: document.getElementById('name').value.trim(),
    telefone: document.getElementById('phone')?.value.trim() || '',
    cpf: document.getElementById('cpf')?.value.trim() || '',
    tipo_exame: document.getElementById('exam-type')?.value || '',
    data_agendamento: document.getElementById('selected-date')?.value || '',
    mensagem: document.getElementById('message')?.value.trim() || ''
  };

  try {
    const response = await fetch('salvar_agendamento.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (result.success) {
      alert("Agendamento salvo!");
      document.getElementById('contact-form').reset();
    } else {
      alert(`Erro ao agendar: ${result.error}`);
    }
  } catch (error) {
    console.error('Erro:', error);
    alert("Houve um erro ao enviar o formulário.");
  }
});