// cart/cart-storage.js

// تحميل السلة من localStorage
export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// حفظ السلة
export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// إضافة منتج للسلة
export function addProductToCart(product) {
    const cart = getCart();
    const existing = cart.find(p => p.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
}