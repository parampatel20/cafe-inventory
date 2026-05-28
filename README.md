# ☕ Cafe Inventory Management System

A simple and practical **Cafe Inventory Management System** built for managing cafe stock, staff access, item categories, price updates, bill uploads, and inventory control from any device.

This project is designed for a real cafe environment where the owner/admin can fully manage inventory, while staff members can perform limited actions based on their permissions.

---

## 📌 Project Overview

The Cafe Inventory Management System helps cafe owners manage daily stock and inventory in an organized way.  
It supports role-based access, item management, category filtering, bill uploads, and remote access through phone or laptop.

The system is useful for cafes, restaurants, cloud kitchens, bakeries, and small food businesses.

---

## 🚀 Features

### 👨‍💼 Admin / Owner Features

- Login as admin
- Add new inventory items
- Remove inventory items
- Update item price
- Update item quantity
- Add new staff members
- Remove staff members
- Give or remove staff access
- Upload bills and purchase records
- Manage item categories
- View inventory from phone or laptop
- Access system remotely using Tailscale

---

### 👥 Staff Features

- Login as staff
- Add inventory items
- Update stock quantity
- Upload bills if permission is given
- View available inventory
- Cannot delete items unless admin gives access

---

### 📦 Inventory Features

- Add item name
- Add item quantity
- Add item price
- Add item category
- Edit item details
- Delete item
- Sort/filter items by category
- Upload bill image or document
- Track kitchen, bar, and takeaway inventory separately

---

## 🗂️ Inventory Categories

Example categories used in the system:

### 🍝 Kitchen

- Pasta
- Pizza
- Sandwich
- Burger
- Sauces
- Raw material

### ☕ Bar

- Coffee
- Soda
- Tea
- Cold drinks
- Syrups
- Milk products

### 📦 Take Away

- Pizza box
- Paper cups
- Straws
- Tissue
- Bags
- Packaging material

---

## 🛠️ Tech Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Deployment / Running

- Docker
- Docker Compose
- Tailscale for remote access

---

## 📁 Project Structure

```text
cafe-inventory/
│
├── backend/
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── ...
│
├── docker-compose.yml
├── START.bat
├── STOP.bat
├── .gitignore
└── README.md
