import { api } from './api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category: {
    _id: string;
    name: string;
  };
  inStock: boolean;
  quantity: number;
  image?: string;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductData {
  name: string;
  price: number;
  description?: string;
  categoryId: string;
  inStock: boolean;
  quantity: number;
  image?: File;
}

export interface UpdateProductData {
  name?: string;
  price?: number;
  description?: string;
  categoryId?: string;
  inStock?: boolean;
  quantity?: number;
  image?: string;
}

export const productService = {
  // Get all products with optional search
  async getProducts(search?: string): Promise<{ products: Product[] }> {
    const params = new URLSearchParams();
    if (search) {
      params.append('search', search);
    }
    
    const response = await fetch(`${API_BASE_URL}/products?${params}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return response.json();
  },

  // Get product by ID
  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    return response.json();
  },

  // Create new product
  async createProduct(productData: CreateProductData): Promise<{ message: string; product: Product }> {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price.toString());
    formData.append('categoryId', productData.categoryId);
    formData.append('inStock', productData.inStock.toString());
    formData.append('quantity', productData.quantity.toString());
    
    if (productData.description) {
      formData.append('description', productData.description);
    }
    
    if (productData.image) {
      formData.append('image', productData.image);
    }

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    return response.json();
  },

  // Update product
  async updateProduct(id: string, productData: UpdateProductData): Promise<{ message: string; product: Product }> {
    const formData = new FormData();
    
    if (productData.name) formData.append('name', productData.name);
    if (productData.price) formData.append('price', productData.price.toString());
    if (productData.categoryId) formData.append('categoryId', productData.categoryId);
    if (productData.inStock !== undefined) formData.append('inStock', productData.inStock.toString());
    if (productData.quantity) formData.append('quantity', productData.quantity.toString());
    if (productData.description) formData.append('description', productData.description);

    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    
    return response.json();
  },

  // Delete product
  async deleteProduct(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    
    return response.json();
  },

  // Get featured products (first 5 products for now)
  async getFeaturedProducts(): Promise<Product[]> {
    const { products } = await this.getProducts();
    return products.slice(0, 5); // Return first 5 products as featured
  },
};