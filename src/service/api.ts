/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '@/lib/Constants';
import apiClient from '@/service/axios';
import axios from 'axios';

export const createUser = async (userData: Record<string, any>) => {
  try {
    const response = await axios.post(`${API_URL}users`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getSuggestFriend = async () => {
  try {
    const response = await apiClient.get(`${API_URL}users`);
    return response.data;
  } catch (error) {
    console.error('Error getting suggest friend:', error);
    throw error;
  }
}


