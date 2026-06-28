"use client";
import { useCart } from "@/app/hooks/useCart";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDown, ChevronUp, MenuIcon, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const {
    cartItems,
    isCartOpen,
    openCart,
    closeCart,
    clearCart,
    removeOneItem,
    incrementItem,
    decrementItem,
    totalPrice,
    totalItemsCount,
  } = useCart();

  return (
    <nav className="flex items-center justify-center sticky top-0 p-4 bg-[#E7E2DD] z-40">
      <div className="flex items-center justify-between max-w-282 w-full">
        <MenuIcon size={28} />
        <Image src="./logo.svg" alt="logo" width={200} height={200} />
        <button onClick={openCart}>
          <div className="relative hover:cursor-pointer">
            <FontAwesomeIcon icon={faCartPlus} size="xl" />
            <p className="flex items-center justify-center absolute -inset-y-2 left-4 bg-[#F09D51] rounded-md py-3/4 px-1 text-white h-3/4">
              {totalItemsCount}
            </p>
          </div>
        </button>

        {isCartOpen && (
          <div
            className="fixed inset-0 z-50 bg-orange-300/40 flex justify-end overflow-auto"
            onClick={closeCart}
          >
            <div
              className="p-4 max-w-138 w-full h-full bg-[#f2ede8] animate-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex">
                <button
                  onClick={closeCart}
                  className="mt-2 p-1.5 bg-black text-white hover:cursor-pointer rounded-md font-bold"
                >
                  <X size={15} />
                </button>
              </div>

              {cartItems.length > 0 ? (
                <div className="flex flex-col gap-3 items-center justify-center mt-3">
                  <p className="text-2xl font-bold text-[#222222] mb-3">Your Cart</p>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex w-full items-center justify-between m-2"
                    >
                      <div className="flex">
                        <Image
                          src={item.Image}
                          alt="image"
                          width={70}
                          height={90}
                          className="h-19 w-19"
                        />
                        <div className="ml-5">
                          <p className="text-sm font-semibold leading-relaxed text-md">{item.title}</p>
                          <p className="text-sm text-gray-700 mt-px font-semibold leading-relaxed">
                            TK {item.price}
                          </p>
                          <button
                            className="mt-0.5 text-gray-600 hover:cursor-pointer"
                            onClick={() => { removeOneItem(item.id); closeCart(); }}
                          >
                            remove
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <button
                          onClick={() => incrementItem(item.id)}
                          className="hover:cursor-pointer"
                        >
                          <ChevronUp className="text-[#F09D51]" />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={() => decrementItem(item.id)}
                          className="hover:cursor-pointer"
                        >
                          <ChevronDown className="text-[#F09D51]" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <p className="text-xl font-bold">Your Total: TK {totalPrice}</p>
                  <button
                    onClick={clearCart}
                    className="mb-4 bg-[#f09d51] h-13 w-50 flex items-center justify-center hover:bg-transparent hover:text-orange-400 hover:cursor-pointer  hover:border-orange-400 hover:border"
                  >
                    <p className="text-xl uppercase">Clear Cart</p>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6 items-center justify-center mt-6">
                  <p className="text-2xl font-bold">Your Cart</p>
                  <p className="text-xl font-bold">Your Total: TK 0</p>
                  <button
                    onClick={() => { clearCart(); closeCart(); }}
                    className="bg-[#f09d51] h-13 w-50 flex items-center justify-center hover:bg-transparent hover:text-orange-400 hover:cursor-pointer  hover:border-orange-400 hover:border"
                  >
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