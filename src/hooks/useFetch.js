import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          let message = 'No se pudo obtener la información solicitada.';
          try {
            const errorData = await response.json();
            if (errorData?.message) {
              message = errorData.message;
            }
          } catch (jsonError) {
            // Ignorar errores al parsear el JSON del error.
          }

          if (response.status === 404) {
            message = 'No se encontraron datos del clima para esta ciudad. Por favor, revisa el nombre.';
          }

          throw new Error(message);
        }
        const json = await response.json();
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};
