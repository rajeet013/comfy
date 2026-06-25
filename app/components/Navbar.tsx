"use client";
import {
  ChevronDown,
  ChevronUp,
  MenuIcon,
  ShoppingCartIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  Image: string;
  title: string;
  price: number;
  quantity: number;
}

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const updateCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    };

    updateCart();

    window.addEventListener("storage-update", updateCart);
    return () => window.removeEventListener("storage-update", updateCart);
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCartOpen(false);
  };

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const totalItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const removeOneItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartItems(updated);
  };

  return (
    <nav className="flex items-center justify-center sticky top-0 p-4 bg-stone-200 z-40">
      <div className="flex items-center justify-between max-w-6xl w-full">
        <MenuIcon />
        <Image src="./logo.svg" alt="logo" width={200} height={200} />
        <button onClick={openCart}>
          <div className="relative">
            <ShoppingCartIcon className="hover:cursor-pointer" />
            <p className="flex items-center justify-center absolute -inset-y-2 left-4 bg-orange-400 rounded-md py-3/4 px-1 text-white h-3/4">
              {totalItemsCount}
            </p>
          </div>
        </button>

        {isCartOpen && (
          <div
            className={`fixed inset-0 right-0 z-100 bg-opacity-50 bg-orange-300/40 flex justify-end transition duration-500 ease-in-out overflow-y-auto`}
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
              {cartItems.length > 0 ? (
                <div className="flex flex-col gap-6 items-center justify-center">
                  <p className="text-2xl font-bold">Your Cart</p>
                  {cartItems.map((item, id) => (
                    <div
                      key={id}
                      className="flex w-full items-center justify-between mb-3"
                    >
                      <div className="flex">
                        <Image
                          src={item.Image}
                          alt="image"
                          width={70}
                          height={80}
                        />
                        <div className="ml-5">
                          <p className="text-sm">{item.title}</p>
                          <p className="text-sm text-gray-700">
                            TK {item.price}
                          </p>
                          <button onClick={() => removeOneItem(item.id)}>
                            remove
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentCart = JSON.parse(
                              localStorage.getItem("cart") || "[]",
                            );

                            const existingItem = currentCart.find(
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (i: any) => i.id === item.id,
                            );

                            if (existingItem) {
                              existingItem.quantity += 1;
                            } else {
                              currentCart.push({ ...item, quantity: 1 });
                            }

                            localStorage.setItem(
                              "cart",
                              JSON.stringify(currentCart),
                            );

                            window.dispatchEvent(new Event("storage-update"));
                          }}
                          className="hover:cursor-pointer"
                        >
                          <ChevronUp className="text-orange-400" />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentCart = JSON.parse(
                              localStorage.getItem("cart") || "[]",
                            );

                            const existingItem = currentCart.find(
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (i: any) => i.id === item.id,
                            );

                            if (existingItem) {
                              existingItem.quantity -= 1;

                              if (existingItem.quantity <= 0) {
                                const itemIndex =
                                  currentCart.indexOf(existingItem);
                                currentCart.splice(itemIndex);
                              }
                            }

                            localStorage.setItem(
                              "cart",
                              JSON.stringify(currentCart),
                            );

                            window.dispatchEvent(new Event("storage-update"));
                          }}
                          className="hover:cursor-pointer"
                        >
                          <ChevronDown className="text-orange-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <p className="text-xl font-bold">
                    Your Total: TK {totalPrice}
                  </p>
                  <button
                    onClick={clearCart}
                    className="bg-orange-400 h-15 w-50 p-4 hover:bg-white/60 hover:text-orange-400 hover:cursor-pointer hover:border hover:border-orange-400"
                  >
                    <p className="text-xl uppercase">Clear Cart</p>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6 items-center justify-center">
                  <p className="text-2xl font-bold">Your Cart</p>
                  <p className="text-xl font-bold">Your Total: TK 0</p>
                  <button className="bg-orange-400 w-50 p-4 hover:bg-white/60 hover:text-orange-400 hover:cursor-pointer hover:border hover:border-orange-400">
                    <p className="text-xl uppercase">Clear Cart</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
