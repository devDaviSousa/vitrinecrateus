import { api } from "./api.js";

export async function registerUser({ name, email, password }) {
  const { data } = await api.post("/users", {
    name,
    email,
    password,
    provider: false,
  });
  return data;
}

export async function loginUser({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });

  if (
    !data
    || typeof data.token !== "string"
    || !Number.isFinite(data.expiresIn)
    || data.expiresIn <= 0
    || data.user?.id == null
    || typeof data.user?.name !== "string"
    || typeof data.user?.email !== "string"
  ) {
    throw new Error("A resposta de autenticação da API está em formato inválido.");
  }

  return data;
}
