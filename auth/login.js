// auth/login.js
import { getFromStorage } from '../storage/storage.js';

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const users = getFromStorage('users') || [];

    const matchedUser = users.find(user => user.email === email && user.password === password);

    if (!matchedUser) {
        alert('Invalid email or password');
        return;
    }

    // Save current user session
    localStorage.setItem('currentUser', JSON.stringify(matchedUser));

    alert(`Welcome, ${matchedUser.username}!`);

    // Redirect based on role
    if (matchedUser.isAdmin === true) {

        window.location.href = '../admin/admin.html';
    } else {
        window.location.href = '../home.html';
    }
});