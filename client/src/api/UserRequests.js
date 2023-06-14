import axios from "axios";
import { domain } from "../constants/constants";

const API = axios.create({ baseURL: domain });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const getUser = async (userId) => {
  console.log(`API.get`)
  return API.get(`/user/${userId}`)
}
export const updateUser = async (id, formData) => {
  console.log(`API.get`)
  return API.put(`/user/${id}`, formData)
}

export const getAllUser = async () => {
  console.log(`API.get`)
  return API.get('/user')
}
export const followUser = async (id, data) => {
  console.log(`API.get`)
  return API.put(`/user/${id}/follow`, data)
}
export const unfollowUser = async (id, data) => {
  console.log(`API.get`)
  return API.put(`/user/${id}/unfollow`, data)
}
export const deleteUser = async (id) => {
  console.log(`API.get`)
  return API.delete(`/user/${id}`)
}

export const getUserById = async (userId) => {
  console.log(`API.get`)
  return API.get(`/user/${userId}`)
}









