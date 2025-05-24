// storage/storage.js
export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function addToCart(product) {
    const cart = getCart();
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function clearCart() {
    localStorage.removeItem('cart');
}