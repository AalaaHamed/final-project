// helper/update-cart-count.js
import { getCart } from '../cart/cart-storage.js';

export function updateCartCount() {
    const countSpan = document.getElementById('cartCount');
    if (countSpan) {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        countSpan.textContent = count;
    }
}