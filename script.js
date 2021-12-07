const cartItems = document.querySelector('.cart__items');
const classTotalPrice = document.querySelector('.total-price');
let totalPrice = 0;

function updatePrice(price) {
  classTotalPrice.innerHTML = price;
  localStorage.setItem('value', price);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  const capturePrice = Number(event.target.dataset.cartPrice);
  const getTotalPrice = localStorage.getItem('value');
  totalPrice = getTotalPrice - capturePrice;
  updatePrice(totalPrice);
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
}

function clearListCart() {
  const emptyCart = document.querySelector('.empty-cart');
  emptyCart.addEventListener('click', () => {
  saveCartItems(cartItems.innerHTML = '');
});
}
clearListCart();

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  totalPrice = Number(localStorage.getItem('value')) + salePrice;
  updatePrice(totalPrice);
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.dataset.cartPrice = salePrice;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const items = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(btn);
  btn.addEventListener('click', async () => {
    const itemList = await fetchItem(sku);
    cartItems.appendChild(createCartItemElement(itemList));
    saveCartItems(cartItems.innerHTML);
  });
  return items.appendChild(section);
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function addScreen() {
  const { results } = await fetchProducts('computador');
  results.forEach((result) => {
  createProductItemElement(result);
  });
}

window.onload = () => { 
  addScreen();
  cartItems.innerHTML = getSavedCartItems();
  const cartListItems = document.querySelectorAll('.cart__item');
  cartListItems.forEach((items) => items.addEventListener('click', cartItemClickListener));
  const getTotalPrice = localStorage.getItem('value');
  classTotalPrice.innerHTML = getTotalPrice;
};

// Auxiliado por Willian ALves - Turma 17