import { api } from "./api.js";

function isClassification(value) {
  return value
    && typeof value === "object"
    && (value.media === null || Number.isFinite(value.media))
    && Number.isInteger(value.quantidade)
    && value.quantidade >= 0;
}

export async function getMinhaAvaliacao(serviceId, { signal } = {}) {
  const { data } = await api.get(
    `/servicos/${encodeURIComponent(serviceId)}/avaliacao`,
    { signal },
  );

  if (
    !data
    || (data.nota !== null && (!Number.isInteger(data.nota) || data.nota < 1 || data.nota > 5))
  ) {
    throw new Error("A resposta da avaliação do usuário está em formato inválido.");
  }

  return data.nota;
}

export async function saveMyRating(serviceId, nota) {
  const { data } = await api.put(
    `/servicos/${encodeURIComponent(serviceId)}/avaliacao`,
    { nota },
  );

  if (
    !data
    || !Number.isInteger(data.nota)
    || data.nota < 1
    || data.nota > 5
    || !isClassification(data.classificacao)
  ) {
    throw new Error("A resposta ao salvar a avaliação está em formato inválido.");
  }

  return data;
}
