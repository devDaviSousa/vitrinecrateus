import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3333";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export function resolveServiceLogo(logo) {
  if (typeof logo !== "string" || !logo.startsWith("/uploads/")) return logo;
  return new URL(logo, API_BASE_URL).href;
}
