"use client";
import { useCart } from "@/app/hooks/useCart";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import CartModal from "./cartModal/cartModal";

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
            <p className="flex absolute -inset-y-2 left-4 bg-[#F09D51] rounded-md py-0.125 px-1.5 text-white h-3/4">
              {totalItemsCount}
            </p>
          </div>
        </button>

        {isCartOpen && (
          <CartModal
            cartItems={cartItems}
            totalPrice={totalPrice}
            onClose={closeCart}
            onClearCart={clearCart}
            onRemoveItem={removeOneItem}
            onIncrementItem={incrementItem}
            onDecrementItem={decrementItem}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
