import { Api } from "@/shared/services/api-client";
import { Brand } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    async function fetchBrands() {
      try {
        setLoading(true);
        const brands = await Api.brands.getAll();
        setBrands(brands);
        hasFetched.current = true;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);
  return { brands, loading };
};
