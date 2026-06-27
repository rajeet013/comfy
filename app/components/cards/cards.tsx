"use client";
import { useCartIds } from "@/app/hooks/useCartIds";
import { useWindowSize } from "@/app/hooks/useWindowSize";
import { products } from "@/app/constants/products";
import { CheckIcon, ShoppingCartIcon } from "lucide-react";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cards = () => {
  const cartIds = useCartIds();
  const dimensions = useWindowSize();

  const handleAddToCart = (item: (typeof products)[0]) => {
    if (cartIds.includes(item.id)) return;

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = currentCart.find((i: { id: number }) => i.id === item.id);

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
      {products.map((item) => {
        const inCart = cartIds.includes(item.id);

        return (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center gap-3"
          >
            <div className="group relative overflow-hidden">
              <Image
                src={item.Image}
                alt="product"
                width={dimensions.width}
                height={dimensions.height}
                className="h-50 w-70"
              />
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
              <div className="absolute inset-x-0 bottom-6 flex justify-end opacity-0 transition-all duration-600 translate-x-full group-hover:translate-x-0 group-hover:opacity-100">
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`flex items-center justify-center gap-2 uppercase p-2 shadow-lg text-sm font-semibold transition-all hover:cursor-pointer
                    ${inCart
                      ? "w-1/3 bg-[#F09D51] text-black hover:text-white"
                      : "w-1/2 bg-[#F09D51] text-black hover:text-white"
                    }`}
                >
                  {inCart ? (
                    <>In Cart</>
                  ) : (
                    <><FontAwesomeIcon icon={faShoppingCart} size="sm" /> Add to Cart</>
                  )}
                </button>
              </div>
            </div>
            <p className="text-xl">{item.title}</p>
            <p className="text-orange-400">TK {item.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;