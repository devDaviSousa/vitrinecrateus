import { api } from './api.js';

export async function getServicos({ signal } = {}) {
  const { data } = await api.get('/servicos', { signal });

  if (!Array.isArray(data)) {
    throw new Error('A resposta da API de serviços não está no formato esperado.');
  }

  return data;
}
