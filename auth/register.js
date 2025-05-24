// auth/register.js
import { saveToStorage, getFromStorage } from '../storage/storage.js';

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementById('isAdmin')?.checked || false;

    if (!username || !email || !password) {
        alert('All fields are required');
        return;
    }

    const users = getFromStorage('users') || [];

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        alert('User already exists');
        return;
    }

    const newUser = { username, email, password, isAdmin };
    console.log('New user registered:', newUser); // للتأكد من البيانات

    users.push(newUser);
    saveToStorage('users', users);

    alert('Registered successfully! You can login now.');
    window.location.href = 'login.html';
});