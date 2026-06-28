"use client";
import { products } from "@/app/constants/products";
import { useCartIds } from "@/app/hooks/useCartIds";
import { useWindowSize } from "@/app/hooks/useWindowSize";
import Cards from "./cards/cards";

const Products = () => {
  const cartIds = useCartIds();
  const dimensions = useWindowSize();

  return (
    <main className="p-4 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mt-15 mb-20">Our Products</h2>
      <Cards products={products} cartIds={cartIds} dimensions={dimensions} />
    </main>
  );
};

export default Products;
