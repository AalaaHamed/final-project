// import الدالة اللي بتحدث العداد
import { updateCartCount } from '../helper/update-cart-count.js';
updateCartCount();

// عناصر الصفحة
const productsList = document.getElementById('productsList');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');

let allProducts = [];

// جلب المنتجات
async function fetchProducts() {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        allProducts = await res.json();
        renderProducts(allProducts);
    } catch (err) {
        console.error('Error fetching products:', err);
    }
}

// جلب التصنيفات
async function fetchCategories() {
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await res.json();
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
    } catch (err) {
        console.error('Error fetching categories:', err);
    }
}

// عرض المنتجات
function renderProducts(products) {
    productsList.innerHTML = products.map(product => `
        <div class="card">
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title.slice(0, 30)}...</h3>
            <p>$${product.price}</p>
            <button onclick="viewDetails(${product.id})">Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// فلترة المنتجات
function filterProducts() {
    const search = searchInput.value.toLowerCase();
    const category = categorySelect.value;

    const filtered = allProducts.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(search);
        const matchesCategory = category === 'all' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
}

searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);

// دالة عرض التفاصيل
window.viewDetails = function (id) {
    `window.location.href = details.html ? id = ${id}`;
};

// دالة إضافة للسلة
window.addToCart = function (id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.title} added to cart`);
};

// بداية التحميل
fetchProducts();
fetchCategories();