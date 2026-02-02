import axios from "axios";

const API_URL = "http://localhost:3000/api/categories";

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with auth header
const createAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCategories = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createCategory = async (formData: FormData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      ...createAuthHeaders(),
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const updateCategory = async (id: string, formData: FormData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      ...createAuthHeaders(),
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: createAuthHeaders()
  });
  return res.data;
};
