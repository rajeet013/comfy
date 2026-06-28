"use client";
import { products } from "@/app/constants/products";
import CardComponent from "./cardComponent";

type Product = (typeof products)[0];

interface CardsProps {
  products: Product[];
  cartIds: number[];
  dimensions: { width: number; height: number };
}

const Cards = ({ products, cartIds, dimensions }: CardsProps) => {
  const handleAddToCart = (item: Product) => {
    if (cartIds.includes(item.id)) return;

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = currentCart.find(
      (i: { id: number }) => i.id === item.id,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage-update"));
    window.dispatchEvent(new Event("open-cart"));
  };

  return (
    <div className="grid grid-cols-1 min-[605px]:grid-cols-2 min-[920px]:grid-cols-3 min-[1236px]:grid-cols-4 gap-5">
      {products.map((item) => (
        <CardComponent
          key={item.id}
          item={item}
          inCart={cartIds.includes(item.id)}
          dimensions={dimensions}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default Cards;