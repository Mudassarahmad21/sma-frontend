import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = (data) =>
  axios.post(`${API_URL}/auth/register`, data);

export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);

export const fetchStudents = (token) =>
  axios.get(`${API_URL}/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createStudent = (data, token) =>
  axios.post(`${API_URL}/students`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateStudent = (id, data, token) =>
  axios.put(`${API_URL}/students/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteStudent = (id, token) =>
  axios.delete(`${API_URL}/students/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
