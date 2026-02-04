# API Endpoints Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
- **Bearer Token**: Include `Authorization: Bearer <jwt_token>` in headers
- **Roles**: `admin`, `vendor`, `client`

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
```
**Access**: Public  
**Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response**:
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "client"
  }
}
```

### Login User
```http
POST /auth/login
```
**Access**: Public  
**Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile
```http
GET /auth/me
```
**Access**: Authenticated users only  
**Headers**: `Authorization: Bearer <token>`

### Change Password
```http
PUT /auth/change-password
```
**Access**: Authenticated users only  
**Body**:
```json
{
  "oldPassword": "current_password",
  "newPassword": "new_password"
}
```

### Forgot Password
```http
POST /auth/forgot-password
```
**Access**: Public  
**Body**:
```json
{
  "email": "john@example.com"
}
```

### Reset Password
```http
POST /auth/reset-password
```
**Access**: Public  
**Body**:
```json
{
  "token": "reset_token_from_email",
  "newPassword": "new_password"
}
```

---

## 📂 Category Endpoints

### Get All Categories
```http
GET /categories
```
**Access**: Public  
**Description**: Retrieve all categories

### Get Category by ID
```http
GET /categories/:id
```
**Access**: Authenticated users  
**Headers**: `Authorization: Bearer <token>`

### Create Category
```http
POST /categories
```
**Access**: Admin only  
**Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`  
**Body** (FormData):
```
name: "Electronics"
description: "Electronic devices and accessories"
image: [file] (optional)
```

### Update Category
```http
PUT /categories/:id
```
**Access**: Admin only  
**Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`  
**Body** (FormData):
```
name: "Updated Electronics"
description: "Updated description"
image: [file] (optional)
```

### Delete Category
```http
DELETE /categories/:id
```
**Access**: Admin only  
**Headers**: `Authorization: Bearer <token>`

---

## 🛍️ Product Endpoints

### Get All Products
```http
GET /products
GET /products?search=keyword
```
**Access**: Public  
**Query Parameters**:
- `search` (optional): Search by product name or description

### Get Product by ID
```http
GET /products/:id
```
**Access**: Authenticated users  
**Headers**: `Authorization: Bearer <token>`

### Create Product
```http
POST /products
```
**Access**: Admin or Vendor  
**Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`  
**Body** (FormData):
```
name: "iPhone 15"
price: 1200
description: "Latest Apple phone"
categoryId: "category_id_here"
inStock: true
quantity: 20
image: [file] (optional)
```

### Update Product
```http
PUT /products/:id
```
**Access**: Admin or Product Owner (Vendor)  
**Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`  
**Body** (FormData):
```
name: "Updated iPhone 15"
price: 1100
description: "Updated description"
categoryId: "new_category_id"
inStock: false
quantity: 15
image: [file] (optional)
```

### Delete Product
```http
DELETE /products/:id
```
**Access**: Admin or Product Owner (Vendor)  
**Headers**: `Authorization: Bearer <token>`

---

## 🛒 Cart Endpoints

### Get User's Cart
```http
GET /cart
```
**Access**: Authenticated users (own cart only)  
**Headers**: `Authorization: Bearer <token>`

### Add Item to Cart
```http
POST /cart/items
```
**Access**: Authenticated users  
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Update Cart Item
```http
PUT /cart/items/:id
```
**Access**: Cart owner or Admin  
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "quantity": 3
}
```

### Remove Item from Cart
```http
DELETE /cart/items/:id
```
**Access**: Cart owner or Admin  
**Headers**: `Authorization: Bearer <token>`

### Clear Cart
```http
DELETE /cart
```
**Access**: Cart owner or Admin  
**Headers**: `Authorization: Bearer <token>`

---

## 📦 Order Endpoints (User)

### Create Order (Checkout)
```http
POST /orders
```
**Access**: Authenticated users  
**Headers**: `Authorization: Bearer <token>`  
**Description**: Creates order from current cart items

### Get My Orders
```http
GET /orders
```
**Access**: Authenticated users (own orders only)  
**Headers**: `Authorization: Bearer <token>`

### Get Order by ID
```http
GET /orders/:id
```
**Access**: Order owner or Admin  
**Headers**: `Authorization: Bearer <token>`

### Cancel Order
```http
PATCH /orders/:id/cancel
```
**Access**: Order owner or Admin  
**Headers**: `Authorization: Bearer <token>`  
**Description**: Can only cancel pending orders

---

## 👑 Admin Order Management

### Get All Orders
```http
GET /admin/orders
```
**Access**: Admin only  
**Headers**: `Authorization: Bearer <token>`  
**Description**: View all orders from all users

### Update Order Status
```http
PATCH /admin/orders/:id/status
```
**Access**: Admin only  
**Headers**: `Authorization: Bearer <token>`  
**Body**:
```json
{
  "status": "confirmed"
}
```
**Valid Status Values**: `confirmed`, `shipped`, `delivered`, `cancelled`

---

## 🔒 Role-Based Access Summary

| Role | Permissions |
|------|-------------|
| **Public** | View categories/products, register, login, password reset |
| **Client** | Manage own cart, create orders, view own orders, cancel own orders |
| **Vendor** | Client permissions + create/edit/delete own products |
| **Admin** | All permissions + manage categories, view all orders, update order status |

---

## 📝 Response Formats

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

### Authentication Error
```json
{
  "message": "Not authorized"
}
```

### Authorization Error
```json
{
  "message": "Access denied: insufficient permissions"
}
```

---

## 🚀 Getting Started

1. **Register/Login** to get JWT token
2. **Store token** in localStorage or headers
3. **Include token** in Authorization header for protected routes
4. **Admin access** requires user role to be set to "admin" in database

### Example Request with Authentication
```javascript
fetch('http://localhost:5000/api/categories', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your_jwt_token_here',
    'Content-Type': 'multipart/form-data'
  },
  body: formData
})
```