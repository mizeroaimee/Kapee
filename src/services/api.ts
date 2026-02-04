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

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export const api = {
  async getProducts(search?: string): Promise<{ products: Product[] }> {
    const params = new URLSearchParams();
    if (search) params.append('search', search);

    const response = await fetch(`${API_BASE_URL}/products?${params}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const { products } = await this.getProducts();
    return products.slice(0, 5); // Return first 5 products as featured
  },

  async getCategoryById(id: string): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  }
};