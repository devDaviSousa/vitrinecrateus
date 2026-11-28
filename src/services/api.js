import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3333";
const AUTH_TOKEN_KEY = "vitrine-auth-token";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveAccessToken(token) {
  window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAccessToken() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

export function resolveServiceLogo(logo) {
  if (typeof logo !== "string" || !logo.startsWith("/uploads/")) return logo;
  return new URL(logo, API_BASE_URL).href;
}
