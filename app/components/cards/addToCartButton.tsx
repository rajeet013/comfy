"use client";
import ButtonB from "./buttonB";

interface AddToCartButtonProps {
  item: {
    id: number;
    Image: string;
    title: string;
    price: number;
  };
}

const AddToCartButton = ({ item }: AddToCartButtonProps) => {
  const handleAddToCart = () => {
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
    <div className="flex flex-col gap-3 mt-2">
      <ButtonB title="Add to Cart" color="#F09D51" onClick={handleAddToCart} />
      <ButtonB title="Buy Now" color="transparent" />
    </div>
  );
};

export default AddToCartButton;
