import { api } from './api.js';

export async function getServicos({ signal } = {}) {
  const { data } = await api.get('/servicos', { signal });

  if (!Array.isArray(data)) {
    throw new Error('A resposta da API de serviços não está no formato esperado.');
  }

  return data;
}

export async function getServicoById(id, { signal } = {}) {
  const { data } = await api.get(`/servicos/${encodeURIComponent(id)}`, { signal });

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('A resposta da API do serviço não está no formato esperado.');
  }

  return data;
}

export async function getCategoriasDeServico({ signal } = {}) {
  const { data } = await api.get('/categorias-de-servico', { signal });

  if (!Array.isArray(data)) {
    throw new Error('A resposta da API de categorias não está no formato esperado.');
  }

  return data;
}

export async function createCategoriaDeServico(payload) {
  const { data } = await api.post('/categorias-de-servico', payload);
  return data;
}

export async function createServico(payload) {
  const { data } = await api.post('/servicos', payload);
  return data;
}
