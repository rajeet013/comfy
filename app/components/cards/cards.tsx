"use client";
import { products } from "@/app/constants/products";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Cards = () => {
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 604) {
        setDimensions({ width: 300, height: 300 });
      } else {
        setDimensions({ width: 400, height: 400 });
      }
    };

    handleResize(); // Run on mount to set initial size

    window.addEventListener("resize", handleResize); // Set up event listener

    return () => window.removeEventListener("resize", handleResize); // Return a cleanup function
  }, []);

  return (
    <div className="grid grid-cols-1 min-[605px]:grid-cols-2 min-[920px]:grid-cols-3 min-[1236px]:grid-cols-4 gap-5">
      {products.map((item, id) => (
        <div
          key={id}
          className="flex flex-col items-center justify-center gap-3"
        >
          <div className="group relative overflow-hidden">
            <Image
              src={item.Image}
              alt="product"
              width={dimensions.width}
              height={dimensions.height}
              className="h-48"
            />
            <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
            <div className="absolute inset-x-0 bottom-4 flex justify-end opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <button className="flex items-center justify-center gap-2 w-1/2 uppercase bg-orange-400 text-black p-2 shadow-lg transform transition-all hover:text-white hover:cursor-pointer text-sm font-semibold">
                <ShoppingCartIcon size={15} /> Add to Cart
              </button>
            </div>
          </div>
          <p className="text-xl">{item.title}</p>
          <p className="text-orange-400">TK {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
