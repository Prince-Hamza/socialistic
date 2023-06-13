import axios from "axios";
import { domain } from "../constants/constants";

const API = axios.create({ baseURL: domain });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const getUser = (userId) => {
  console.log(`API.get`)
  API.get(`/user/${userId}`)
}
export const updateUser = (id, formData) => {
  console.log(`API.get`)
  API.put(`/user/${id}`, formData)
}

export const getAllUser = () => {
  console.log(`API.get`)
  API.get('/user')
}
export const followUser = (id, data) => {
  console.log(`API.get`)
  API.put(`/user/${id}/follow`, data)
}
export const unfollowUser = (id, data) => {
  console.log(`API.get`)
  API.put(`/user/${id}/unfollow`, data)
}
export const deleteUser = (id) => {
  console.log(`API.get`)
  API.delete(`/user/${id}`)
}

export const getUserById = (userId) => {
  console.log(`API.get`)
  API.get(`/user/${userId}`)
}









