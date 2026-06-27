import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  Image: string;
  title: string;
  price: number;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    };

    const handleOpenCart = () => setIsCartOpen(true);

    updateCart();
    window.addEventListener("storage-update", updateCart);
    window.addEventListener("open-cart", handleOpenCart);

    return () => {
      window.removeEventListener("storage-update", updateCart);
      window.removeEventListener("open-cart", handleOpenCart);
    };
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    window.dispatchEvent(new Event("storage-update"));
  };

  const removeOneItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event("storage-update"));
  };

  const incrementItem = (id: number) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = currentCart.find((i: CartItem) => i.id === id);
    if (existingItem) existingItem.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage-update"));
  };

  const decrementItem = (id: number) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = currentCart.find((i: CartItem) => i.id === id);
    if (existingItem) {
      existingItem.quantity -= 1;
      if (existingItem.quantity <= 0) {
        const index = currentCart.findIndex((i: CartItem) => i.id === id);
        currentCart.splice(index, 1); // ← fixed splice bug: now removes only 1 item
      }
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage-update"));
  };

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
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
  };
};