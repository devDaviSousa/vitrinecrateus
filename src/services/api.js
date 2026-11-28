import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3333";
const AUTH_TOKEN_KEY = "vitrine-auth-token";
const AUTH_USER_ID_KEY = "vitrine-auth-user-id";
const AUTH_USER_NAME_KEY = "vitrine-auth-user-name";
const AUTH_USER_EMAIL_KEY = "vitrine-auth-user-email";
const AUTH_EXPIRES_AT_KEY = "vitrine-auth-expires-at";

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
  const token = window.sessionStorage.getItem(AUTH_TOKEN_KEY);
  const expiresAt = Number(window.sessionStorage.getItem(AUTH_EXPIRES_AT_KEY));

  if (token && Number.isFinite(expiresAt) && expiresAt > 0 && Date.now() >= expiresAt) {
    clearAccessToken();
    return null;
  }

  return token;
}

export function getAuthenticatedUser() {
  if (!getAccessToken()) return null;

  const id = window.sessionStorage.getItem(AUTH_USER_ID_KEY);
  const name = window.sessionStorage.getItem(AUTH_USER_NAME_KEY);
  const email = window.sessionStorage.getItem(AUTH_USER_EMAIL_KEY);
  if (!id || !name || !email) return null;

  return { id, name, email };
}

export function saveAuthSession({ token, user, expiresIn }) {
  if (
    typeof token !== "string"
    || !user
    || user.id == null
    || typeof user.name !== "string"
    || typeof user.email !== "string"
    || !Number.isFinite(expiresIn)
    || expiresIn <= 0
  ) {
    throw new TypeError("A sessão recebida da API está em formato inválido.");
  }

  window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  window.sessionStorage.setItem(AUTH_USER_ID_KEY, String(user.id));
  window.sessionStorage.setItem(AUTH_USER_NAME_KEY, user.name);
  window.sessionStorage.setItem(AUTH_USER_EMAIL_KEY, user.email);
  window.sessionStorage.setItem(
    AUTH_EXPIRES_AT_KEY,
    String(Date.now() + expiresIn * 1000),
  );
}

export function clearAccessToken() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
  window.sessionStorage.removeItem(AUTH_USER_ID_KEY);
  window.sessionStorage.removeItem(AUTH_USER_NAME_KEY);
  window.sessionStorage.removeItem(AUTH_USER_EMAIL_KEY);
  window.sessionStorage.removeItem(AUTH_EXPIRES_AT_KEY);
}

export function resolveServiceLogo(logo) {
  if (typeof logo !== "string" || !logo.startsWith("/uploads/")) return logo;
  return new URL(logo, API_BASE_URL).href;
}
