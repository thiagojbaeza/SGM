import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/', credentials);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
