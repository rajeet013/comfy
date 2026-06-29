import { ChevronDown, ChevronUp, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CartItem {
  id: number;
  Image: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartModalProps {
  cartItems: CartItem[];
  totalPrice: string;
  onClose: () => void;
  onClearCart: () => void;
  onRemoveItem: (id: number) => void;
  onIncrementItem: (id: number) => void;
  onDecrementItem: (id: number) => void;
}

const CartModal = ({
  cartItems,
  totalPrice,
  onClose,
  onClearCart,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
}: CartModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-orange-300/40 flex justify-end overflow-auto"
      onClick={handleClose}
    >
      <div
        className={`p-4 max-w-140 w-full h-full bg-[#f2ede8] transform transition duration-500 ease-in-out ${isClosing ? "translate-x-full" : "animate-slide-in"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex transition-all">
          <button
            onClick={handleClose}
            className="mt-2 p-1.5 bg-black text-white hover:cursor-pointer rounded-md font-bold transition-all"
          >
            <X size={15} />
          </button>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-3 items-center justify-center mt-3">
            <p className="text-2xl font-semibold text-[#222222] mb-3">
              Your Cart
            </p>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex w-full items-center justify-between m-2"
              >
                <div className="flex gap-1">
                  <Image
                    src={item.Image}
                    alt="image"
                    width={70}
                    height={90}
                    className="h-19 w-19"
                  />
                  <div className="ml-5">
                    <p className="text-sm font-semibold leading-relaxed text-[16px]">
                      {item.title}
                    </p>
                    <p className="text-[15px] text-gray-700 mt-px font-semibold leading-relaxed">
                      TK {item.price}
                    </p>
                    <button
                      className="text-[15px] mt-0.5 text-gray-600 hover:cursor-pointer"
                      onClick={() => {
                        onRemoveItem(item.id);
                        onClose();
                      }}
                    >
                      remove
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={() => onIncrementItem(item.id)}
                    className="hover:cursor-pointer"
                  >
                    <ChevronUp className="text-[#F09D51]" />
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => onDecrementItem(item.id)}
                    className="hover:cursor-pointer"
                  >
                    <ChevronDown className="text-[#F09D51]" />
                  </button>
                </div>
              </div>
            ))}
            <p className="text-xl font-semibold">
              Your Total : TK {totalPrice}
            </p>
            <Link
              href="/checkout"
              className="mb-4 bg-[#A2DA48] h-13 w-50 flex items-center justify-center hover:bg-transparent hover:text-[#A2DA48] hover:cursor-pointer hover:border-[#A2DA48] hover:border"
            >
              <p className="text-xl uppercase">Checkout</p>
            </Link>
            <button
              onClick={onClearCart}
              className="mb-4 bg-[#f09d51] h-13 w-50 flex items-center justify-center hover:bg-transparent hover:text-[#f09d51] hover:cursor-pointer hover:border-[#f09d51] hover:border"
            >
              <p className="text-xl uppercase">Clear Cart</p>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center justify-center mt-6">
            <p className="text-2xl font-bold mb-4">Your Cart</p>
            <p className="text-xl font-bold">Your Total : TK 0</p>
            <p className="text-xl font-bold">No Items In Card</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
