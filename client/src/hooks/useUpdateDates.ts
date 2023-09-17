import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

export const useUpdateDates = (itemsToUpdate: [] | null = null) => {
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const updateDates = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse = await axios.post(
          URL + "/item/updateDates",
          itemsToUpdate
        );
        setStatus(response.status);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    if (itemsToUpdate) {
      updateDates();
    }
  }, [itemsToUpdate]);

  return { status, loading, error };
};
