// navbar.js
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = '../auth/login.html'; // عدلي حسب مسار صفحة login
    });
}