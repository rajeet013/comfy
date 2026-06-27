import { useEffect, useState } from "react";

export const useCartIds = () => {
  const [cartIds, setCartIds] = useState<number[]>([]);

  useEffect(() => {
    const updateCartIds = () => {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartIds(saved.map((i: { id: number }) => i.id));
    };

    updateCartIds();
    window.addEventListener("storage-update", updateCartIds);
    return () => window.removeEventListener("storage-update", updateCartIds);
  }, []);

  return cartIds;
};