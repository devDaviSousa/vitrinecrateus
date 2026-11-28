import { useCallback, useEffect, useState } from 'react';
import { getCategoriasDeServico } from '../../services/servicosService.js';

export function useCategoriasDeServico() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestNumber, setRequestNumber] = useState(0);

  const refetch = useCallback(() => {
    setRequestNumber((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategorias() {
      setIsLoading(true);
      setError(null);

      try {
        const categorias = await getCategoriasDeServico({ signal: controller.signal });
        setData(categorias);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadCategorias();

    return () => controller.abort();
  }, [requestNumber]);

  return { data, isLoading, error, refetch };
}
