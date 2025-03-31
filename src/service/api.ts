/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '@/lib/Constants';
import apiClient from '@/service/axios';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';



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

// Lấy danh sách bạn bè gợi ý 
export const getSuggestFriend = async () => {
  try {
    const response = await apiClient.get(`${API_URL}users`);
    return response.data;
  } catch (error) {
    console.error('Error getting suggest friend:', error);
    throw error;
  }
}
// End Lấy danh sách bạn bè gợi ý 


// Lấy tất cả request người khác gửi đến mình 
export const getAllRequest = async (userID: string) => {
  try {
    const response = await apiClient.get(`${API_URL}request/${userID}?status=pending`);
    return response.data;
  } catch (error) {
    console.error('Error getting all request:', error);
    throw error;
  }
}
// End Lấy tất cả request người khác gửi đến mình 


// Lấy tất cả request mình gửi đến người khác 
export const getAllRequestMeSend = async (userID: string) => {
  try {
    const response = await apiClient.get(`${API_URL}request/${userID}?status=pending&sendToMe=me`);
    return response.data;
  } catch (error) {
    console.error('Error getting all request:', error);
    throw error;
  }
}
// End Lấy tất cả request mình gửi đến người khác 


// Thu hồi lời mời kết bạn 
export const undoFriend = async (userID: string) => {
  try {
    const response = await apiClient.put(`${API_URL}request/undo/${userID}`);
    return response.data;
  } catch (error) {
    console.error('Error getting all request:', error);
    throw error;
  }
}

// End Thu hồi lời mời kết bạn 



// Chấp nhận lời mời kết bạn 
export const acceptRequest = async (requestID: string) => {
  try {
    const response = await apiClient.put(`${API_URL}request/accept/${requestID}`);
    return response.data;
  } catch (error) {
    console.error('Error accept request:', error);
    throw error;
  }
}
// End Chấp nhận lời mời kết bạn 



// Từ chối lời mời kết bạn 
export const rejectRequest = async (requestID: string) => {
  try {
    const response = await apiClient.put(`${API_URL}request/reject/${requestID}`);
    return response.data;
  } catch (error) {
    console.error('Error accept request:', error);
    throw error;
  }
}
// End Từ chối lời mời kết bạn 



// Hủy kết bạn 
export const unFriend = async (friendID: string) => {
  try {
    const response = await apiClient.put(`${API_URL}friends/unfriend/${friendID}`);
    return response.data;
  } catch (error) {
    console.error('Error accept request:', error);
    throw error;
  }
}
// End Hủy kết bạn



// Lấy danh sách bạn bè  
export const getAllFriend = async () => {
  try {
    const response = await apiClient.get(`${API_URL}friends`);
    return response.data;
  } catch (error) {
    console.error('Error getting all friends:', error);
    throw error;
  }
}
// End Lấy danh sách bạn bè 



// Lấy danh sách bạn bè  
export const getProfile = async (userID: string) => {
  try {
    const response = await apiClient.get(`${API_URL}users/${userID}`);
    return response.data;
  } catch (error) {
    console.error('Error getting all friends:', error);
    throw error;
  }
}
// End Lấy danh sách bạn bè 



// Lấy danh sách chat 1-1 và nhóm chat   
export const friendsAndGroupChat = async () => {
  try {
    const response = await apiClient.get(`${API_URL}conversations`);
    return response.data;
  } catch (error) {
    console.error('Error getting list friends and group chat:', error);
    throw error;
  }
}
// End Lấy danh sách bạn bè 



// Tạo nhóm chat   

export const createGroupChat = async (data: any) => {
  try {
    const response = await apiClient.post(`${API_URL}conversations`, data);
    console.log(response)
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.error(error.response.data.message);  // Đây sẽ là thông báo lỗi từ BE
      toast.error(error.response.data.message);
      // Hiển thị thông báo cho người dùng
    } else {
      console.error('Có lỗi xảy ra:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau!');
    }
    return {
      status: 400,
      message: error
    }
  }
}
// End Tạo nhóm chat  



// Giải tán nhóm 
export const deleteConversation = async (conversationID: any) => {
  try {
    const response = await apiClient.delete(`${API_URL}conversations/${conversationID}`);
    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.error(error.response.data.message);  // Đây sẽ là thông báo lỗi từ BE
      toast.error(error.response.data.message);
      // Hiển thị thông báo cho người dùng
    } else {
      console.error('Có lỗi xảy ra:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau!');
    }
    return {
      status: 400,
      message: error
    }
  }
}

// End Giải tán nhóm 



// Giải tán nhóm 
export const outConversation = async (conversationID: any) => {
  try {
    const response = await apiClient.put(`${API_URL}conversations/${conversationID}`);
    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.error(error.response.data.message);  // Đây sẽ là thông báo lỗi từ BE
      toast.error(error.response.data.message);
      // Hiển thị thông báo cho người dùng
    } else {
      console.error('Có lỗi xảy ra:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau!');
    }
    return {
      status: 400,
      message: error
    }
  }
}

// End Giải tán nhóm 



// Thông tin của nhóm chat 
export const informationConversation = async (id: string) => {
  try {
    const response = await apiClient.get(`${API_URL}conversations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting information conversation chat:', error);
    throw error;
  }
}


// End thông tin của nhóm chat 
