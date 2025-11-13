// client/src/lib/axios.js
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  withCredentials: true,
});

/** --- simple activity bus for loader --- */
let active = 0;
const listeners = new Set();
function notify() { listeners.forEach(fn => fn(active > 0)); }
export function onApiActivity(cb) { listeners.add(cb); return () => listeners.delete(cb); }

api.interceptors.request.use((config) => {
  active++; notify();
  return config;
}, (err) => {
  active = Math.max(0, active - 1); notify();
  return Promise.reject(err);
});

api.interceptors.response.use((res) => {
  active = Math.max(0, active - 1); notify();
  return res;
}, (err) => {
  active = Math.max(0, active - 1); notify();
  return Promise.reject(err);
});
