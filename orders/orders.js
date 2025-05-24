// orders.js

// جلب الطلبات من localStorage أو تهيئتها كـ مصفوفة فارغة
let orders = JSON.parse(localStorage.getItem('orders')) || [];

const ordersContainer = document.getElementById('ordersContainer');

// دالة عرض الطلبات في الصفحة
function renderOrders() {
    ordersContainer.innerHTML = '';

    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p>No orders found.</p>';
        return;
    }

    orders.forEach((order, index) => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';

        orderCard.innerHTML = `
            <h4>Order #${index + 1}</h4>
            <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
            <p><strong>Total Items:</strong> ${order.items.length}</p>
            <p><strong>Total Price:</strong> $${order.total.toFixed(2)}</p>
            <button data-index="${index}" class="deleteOrderBtn">Delete Order</button>
        `;

        ordersContainer.appendChild(orderCard);
    });

    // إضافة أحداث حذف الطلبات
    document.querySelectorAll('.deleteOrderBtn').forEach(btn => {
        btn.addEventListener('click', e => {
            const i = e.target.dataset.index;
            deleteOrder(i);
        });
    });
}

// دالة حذف طلب
function deleteOrder(index) {
    if (confirm('Are you sure you want to delete this order?')) {
        orders.splice(index, 1);
        saveOrders();
        renderOrders();
    }
}

// دالة حفظ الطلبات في localStorage
function saveOrders() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// دالة لإضافة طلب جديد (تستخدم بعد إتمام عملية الشراء مثلاً)
function addOrder(cartItems, totalPrice) {
    const newOrder = {
        items: cartItems, // مصفوفة منتجات السلة
        total: totalPrice,
        date: new Date().toISOString()
    };
    orders.push(newOrder);
    saveOrders();
    renderOrders();
}

// عند تحميل الصفحة عرض الطلبات
document.addEventListener('DOMContentLoaded', () => {
    renderOrders();
});

