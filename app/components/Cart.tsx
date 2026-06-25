import CartSummary from "./CartSummary";
import CartItem from "./CartItem";
import { useCart } from "../context/CartContext";

export default function Cart() {

    const { state } = useCart()
    const {CartItems} = state;

    if (CartItems.length === 0) {
        return (
            <div>
                <h1>Empty</h1>
            </div>
        )
    }

    return (
        <div>
            <div>
                <div>
                    <h2>Cart</h2>
                </div>

                <h1>Your Cart</h1>
            </div>

            <div>
                <div>
                    {CartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                <div>
                    <CartSummary />
                </div>
            </div>
        </div>
    )
}