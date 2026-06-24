"use client";
import { MenuIcon, ShoppingCartIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCartOpen(false);
  };

  return (
    <nav className="flex items-center justify-center sticky top-0 p-4 bg-stone-200 z-40">
      <div className="flex items-center justify-between max-w-6xl w-full">
        <MenuIcon />
        <Image src="./logo.svg" alt="logo" width={200} height={200} />
        <button onClick={openCart}>
          <div className="relative">
            <ShoppingCartIcon className="hover:cursor-pointer" />
            <p className="absolute -inset-y-2 left-4 bg-orange-400 py-3/4 px-1 text-white h-3/4">
              0
            </p>
          </div>
        </button>

        {isCartOpen && (
          <div
            className={`fixed inset-0 right-0 z-100 bg-opacity-50 bg-orange-300/40 flex justify-end transition duration-500 ease-in-out`}
            onClick={closeCart}
            suppressHydrationWarning
          >
            <div className="p-4 max-w-lg w-full bg-stone-200">
              <div className="flex">
                <button
                  onClick={closeCart}
                  className="p-2 bg-black text-white hover:cursor-pointer rounded-md"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="flex flex-col gap-6 items-center justify-center">
                <p className="text-2xl font-bold">Your Cart</p>
                <p className="text-xl font-bold">Your Total: TK 0</p>
                <button className="bg-orange-400 w-50 p-4 hover:bg-white/60 hover:text-orange-400 hover:cursor-pointer hover:border hover:border-orange-400">
                  <p className="text-xl uppercase">Clear Cart</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
