const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Product {
  _id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage?: string;
  rating: number;
  reviews: number;
  category: string;
  discount?: string;
  description?: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export const api = {
  async getProducts(category?: string, filters?: {
    sortBy?: string;
    priceRange?: number;
    color?: string;
    size?: string;
  }): Promise<Product[]> {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.priceRange) params.append('maxPrice', filters.priceRange.toString());
    if (filters?.color) params.append('color', filters.color);
    if (filters?.size) params.append('size', filters.size);

    const response = await fetch(`${API_BASE_URL}/products?${params}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getCategoryById(id: string): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  }
};