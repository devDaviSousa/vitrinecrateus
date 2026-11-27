import { useCallback, useEffect, useState } from 'react';
import { getServicos } from '../../services/servicosService.js';

export function useServicos() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestNumber, setRequestNumber] = useState(0);

  const refetch = useCallback(() => {
    setRequestNumber((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadServicos() {
      setIsLoading(true);
      setError(null);

      try {
        const servicos = await getServicos({ signal: controller.signal });
        setData(servicos);
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

    loadServicos();

    return () => controller.abort();
  }, [requestNumber]);

  return { data, isLoading, error, refetch };
}
