import { getCart, removeFromCart, clearCart } from '../storage/storage.js';

const cartItemsContainer = document.getElementById('cartItems');
const totalPriceSpan = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

function renderCart() {
    const cart = getCart();
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        checkoutBtn.disabled = true;
        totalPriceSpan.textContent = '0';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div>
        <h4>${item.title}</h4>
        <p>$${item.price}</p>
        <button data-index="${index}">Remove</button>
      </div>
    `;
        cartItemsContainer.appendChild(itemDiv);
    });
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // هل المنتج موجود بالسلة؟
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex > -1) {
            // لو موجود، نزود الكمية
            cart[existingProductIndex].quantity += 1;
        } else {
            // لو مش موجود، نضيف المنتج مع كمية 1
            cart.push({ ...product, quantity: 1 });
        }

        // حفظ السلة في localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // تحديث عداد السلة في navbar
        updateCartCount();

        alert(`${product.title} has been added to the cart.`);
    }

    // تحديث عداد السلة (مثلاً في Navbar)
    function updateCartCount() {
        const cartCountElem = document.getElementById('cart-count');
        if (cartCountElem) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
            cartCountElem.textContent = totalQuantity;
        }
    }

    // عند تحميل الصفحة حدث عداد السلة
    window.onload = () => {
        updateCartCount();
    };

    totalPriceSpan.textContent = total.toFixed(2);

    document.querySelectorAll('button[data-index]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            removeFromCart(parseInt(index));
            renderCart();
        });
    });
}

checkoutBtn.addEventListener('click', () => {
    alert('Checkout successful! (simulated)');
    clearCart();
    renderCart();
});

renderCart();


function checkout() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    const newOrder = {
        id: Date.now(),
        items: cartItems,
        date: new Date().toISOString(),
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cartItems');

    alert('Order placed successfully!');
    window.location.href = '../orders/orders.html';
}

document.getElementById('checkoutBtn').addEventListener('click', checkout);