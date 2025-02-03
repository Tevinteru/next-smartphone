import { Api } from "@/shared/services/api-client";
import { Brand } from "@prisma/client";
import React from "react";

export const useBrands = () => {
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchBrands() {
      try {
        setLoading(true);
        const brands = await Api.brands.getAll();
        setBrands(brands);
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
