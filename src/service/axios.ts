import { API_URL } from '@/lib/Constants';
import axios from 'axios';
import { getSession } from 'next-auth/react';

// Tạo một instance của Axios
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Thêm interceptor để tự động thêm token vào header
  apiClient.interceptors.request.use(
    async (config) => {
      const session = await getSession(); // Lấy session từ NextAuth
      if (session?.backendTokens?.accessToken) {
        config.headers.Authorization = `Bearer ${session.backendTokens.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default apiClient;