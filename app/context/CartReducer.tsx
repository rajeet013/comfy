interface CartItem {
    id: number;
    title: string;
    price: number;
    Image: string;
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}

interface CartAction {
    type: "ADD_TO_CART" | "DECREMENT" | "REMOVE_FROM_CART";
    payload: CartItem | number;
}

export const initialState = {
    cartItems: [],
}

export function CartReducer(state: CartState, action: CartAction) {
    switch (action.type) {
        case "ADD_TO_CART": {
            const item = action.payload as CartItem;

            const existingItem = state.cartItems.find(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) =>
                        cartItem.id === item.id 
                        ? {...cartItem, quantity: cartItem.quantity + 1}
                        : cartItem
                    )
                }
            }

            return {
                ...state,
                cartItems: [...state.cartItems, { ...item, quantity: 1}]
            }
        }

        case "DECREMENT" : {
            const id = action.payload as CartItem;

            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1} : item
                )
                .filter((item) => item.quantity > 0)
            }
        }

        case "REMOVE_FROM_CART": {
            const id = action.payload as CartItem;

            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== id),
            };
        }

        default : {
            return state;
        }
    }
}