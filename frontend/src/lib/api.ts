import axios from 'axios';

const api = axios.create({
  baseURL: 'https://deeni-madarsa-5yb8.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the adminToken to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const AdminAPI = {
  signup: (data: any) => api.post('/admin/signup', data),
  login: (data: any) => api.post('/admin/login', data),
};

export const CourseAPI = {
  getAll: () => api.get('/courses'),
  getAllAdmin: () => api.get('/courses/all'),
  getById: (id: string) => api.get(`/courses/${id}`),
  create: (data: FormData | any) => {
    let headers = {};
    if (data instanceof FormData) {
      headers = { 'Content-Type': 'multipart/form-data' };
    }
    return api.post('/courses', data, { headers });
  },
  update: (id: string, data: FormData | any) => {
    let headers = {};
    if (data instanceof FormData) {
      headers = { 'Content-Type': 'multipart/form-data' };
    }
    return api.put(`/courses/${id}`, data, { headers });
  },
  delete: (id: string) => api.delete(`/courses/${id}`),
};

export const AnnouncementAPI = {
  getPublic: () => api.get('/announcements'),
  getAdmin: () => api.get('/announcements/admin'),
  create: (data: any) => api.post('/announcements', data),
  update: (id: string, data: any) => api.put(`/announcements/${id}`, data),
  delete: (id: string) => api.delete(`/announcements/${id}`),
};

export const UserAPI = {
  getAll: () => api.get('/users'),
};

export default api;