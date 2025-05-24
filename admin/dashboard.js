// admin/dashboard.js

// جلب بيانات المستخدم الحالي من التخزين
const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));

// حماية الصفحة من غير الأدمن
if (!loggedInUser || !loggedInUser.isAdmin) {
    alert('Access denied! You must be an admin to view this page.');
    window.location.href = '../home.html';
    throw new Error('Unauthorized access');
}

// عرض اسم المستخدم بجانب زر logout في Navbar
const usernameSpan = document.getElementById('username');
if (usernameSpan && loggedInUser) {
    usernameSpan.textContent = loggedInUser.username;
}

const productsContainer = document.getElementById('productsContainer');
const productForm = document.getElementById('productForm');
const productIdInput = document.getElementById('productId');
const productTitleInput = document.getElementById('productTitle');
const productPriceInput = document.getElementById('productPrice');
const productImageInput = document.getElementById('productImage');
const cancelEditBtn = document.getElementById('cancelEditBtn');

let products = JSON.parse(localStorage.getItem('products')) || [];

function renderProducts() {
    productsContainer.innerHTML = '';

    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h4>${product.title}</h4>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button data-index="${index}" class="editBtn">Edit</button>
            <button data-index="${index}" class="deleteBtn">Delete</button>
        `;

        productsContainer.appendChild(card);
    });

    // ربط أزرار التعديل
    document.querySelectorAll('.editBtn').forEach(btn => {
        btn.addEventListener('click', e => {
            const i = e.target.dataset.index;
            startEditProduct(i);
        });
    });

    // ربط أزرار الحذف
    document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', e => {
            const i = e.target.dataset.index;
            deleteProduct(i);
        });
    });
}

function startEditProduct(index) {
    const product = products[index];
    productIdInput.value = index;
    productTitleInput.value = product.title;
    productPriceInput.value = product.price;
    productImageInput.value = product.image;
    cancelEditBtn.style.display = 'inline-block';
}

function cancelEdit() {
    productIdInput.value = '';
    productForm.reset();
    cancelEditBtn.style.display = 'none';
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1);
        saveProducts();
        renderProducts();
    }
};