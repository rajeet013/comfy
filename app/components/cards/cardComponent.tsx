import { products } from "@/app/constants/products";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface CardComponentProps {
  item: (typeof products)[0];
  inCart: boolean;
  dimensions: { width: number; height: number };
  onAddToCart: (item: (typeof products)[0]) => void;
}

const CardComponent = ({
  item,
  inCart,
  dimensions,
  onAddToCart,
}: CardComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
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
            onClick={() => onAddToCart(item)}
            className={`uppercase p-2 shadow-lg text-sm font-semibold transition-all hover:cursor-pointer
              ${
                inCart
                  ? "w-1/3 h-8 bg-[#F09D51] text-black hover:text-white"
                  : "w-1/2 h-8 bg-[#F09D51] text-black hover:text-white"
              }`}
          >
            {inCart ? (
              <div className="flex items-center gap-1">In Cart</div>
            ) : (
              <div className="flex items-center gap-1">
                <div>
                  <FontAwesomeIcon icon={faShoppingCart} size="sm" />
                </div>
                <p>Add to Cart</p>
              </div>
            )}
          </button>
        </div>
      </div>
      <Link href={`/item/${item.id}`} className="text-xl">
        {item.title}
      </Link>
      <p className="text-orange-400">TK {item.price}</p>
    </div>
  );
};

export default CardComponent;
