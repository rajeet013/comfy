"use client";
import { createContext, useContext, useReducer } from "react";
import { CartReducer, initialState } from "./CartReducer";

const CartContext = createContext<CartContextType | null>(null)>;

export function CartProvider({children}: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(CartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}