# final-project
## Project Overview
# Lol-Shop - E-commerce Platform
e-commerce website designed for clothing and fashion using HTML,CSS and vanilla JavaScript by FAKEAPI.
It simulates a fully functional online store with user authentication, product management, shopping cart, and order features. Data is primarily stored in browser Local Storage.
our platforme provides a seamless shopping experience for customers looking to explore ,discover and purchase the latest trends.

## Features

### Authentication
- User registration and login.
- Admin users can manage products.
- Role-based access control (admin vs regular user).

### Admin Dashboard
- Add, edit, and delete products.
- Product details: title, price, image URL.
- Products saved in Local Storage.

### Home & Products
- Fetch product data from a fake API (e.g., FakeStoreAPI).
- Display products as cards with image, title, price, and "Add to Cart" button.
- Search and filter products (if implemented).

### Shopping Cart
- Add products to cart by clicking "Add to Cart".
- View cart with all added products and quantities.
- Update quantities or remove items.
- Cart data saved in Local Storage.

### Orders
- Place orders based on cart contents.
- View order history (saved locally).

### Logout
- Logout clears session and redirects to login page.

## Technologies Used
- HTML
- CSS
- vanilla JavaScript
- Local Storage API
- [FakeStoreAPI](https://fakestoreapi.com/) (for product data)

## Folder Structure
/auth           - Authentication pages and scripts
/admin          - Admin dashboard files (product management) /products - Product listing and detail pages
/cart           - Shopping cart pages and scripts
/helper         -update cart count
/orders         - Orders pages and management
/storage        - Local Storage helper functions
/assets         - Styles, images.
## How to Run

1. Open auth/login.html to log in or register.
2. Admin users can access the dashboard at admin/admin.html for product management.
3. Browse products on the home page (home.html or products/products.html).
4. Add products to the cart by clicking "Add to Cart".
5. View and manage your cart at cart/cart.html.
6. Place orders and check order history in the orders section.
7. Use the logout button to end your session.

## Notes

- This project simulates backend with Local Storage for simplicity.
- To extend functionality, integrate a real backend and database.
- The FakeStoreAPI is used for demo product data, which can be replaced or extended.

## Author
Aalaa Hamed - aalaahamed2@gmail.com .
