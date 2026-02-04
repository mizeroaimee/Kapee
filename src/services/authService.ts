import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Configure axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const login = (data: LoginData) =>
  axios.post(`${API_URL}/login`, data, {
    headers: { 'Content-Type': 'application/json' }
  });

export const register = (data: RegisterData) =>
  axios.post(`${API_URL}/register`, data, {
    headers: { 'Content-Type': 'application/json' }
  });

export const getProfile = (token: string) =>
  axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const logout = (token: string) =>
  axios.post(`${API_URL}/logout`, {}, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

export const changePassword = (data: { oldPassword: string; newPassword: string }, token: string) =>
  axios.put(`${API_URL}/change-password`, data, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

export const forgotPassword = (email: string) =>
  axios.post(`${API_URL}/forgot-password`, { email }, {
    headers: { 'Content-Type': 'application/json' }
  });

export const resetPassword = (token: string, newPassword: string) =>
  axios.post(`${API_URL}/reset-password`, { token, newPassword }, {
    headers: { 'Content-Type': 'application/json' }
  });
