"use client";
import { useCart } from "@/app/hooks/useCart";
import Link from "next/link";
import { useState } from "react";
import { procedure } from "../constants";

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "payment" | "confirm">(
    "details",
  );
  const [orderId] = useState(
    () => Math.floor(Math.random() * 9000000) + 1000000,
  );
  const [selectedMethod, setSelectedMethod] = useState<"Card" | "bKash">(
    "Card",
  );

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-[#faf7f4] px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[#F09D51] mb-2">
            Comfy House
          </p>
          <h1 className="text-4xl font-bold text-black">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-12">
          {procedure.map((item, id) => (
            <div key={id} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                    ${step === item.title ? "bg-[#F09D51] border-[#F09D51] text-white" : "border-gray-300 text-gray-400"}`}
                >
                  {item.id}
                </div>
                <p
                  className={`text-sm uppercase tracking-wider font-semibold ${step === item.title ? "text-[#222222]" : "text-gray-400"}`}
                >
                  {item.title}
                </p>
              </div>
              {item.id < 3 && <div className="w-16 h-px bg-gray-300" />}
            </div>
          ))}
        </div>

        <div className="flex flex-col min-[900px]:flex-row gap-12">
          {/* Left — Form */}
          <div className="w-full min-[900px]:w-3/5 flex flex-col gap-6">
            {step === "details" && (
              <>
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                    Contact
                  </p>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                    Delivery
                  </p>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      className="w-1/2 border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="w-1/2 border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors mt-4"
                  />
                  <div className="flex gap-4 mt-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-1/2 border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Postal code"
                      className="w-1/2 border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors mt-4"
                  />
                </div>

                <button
                  onClick={() => setStep("payment")}
                  className="w-full py-4 bg-[#F09D51] text-white uppercase tracking-widest text-sm font-semibold hover:bg-transparent hover:text-[#F09D51] hover:border hover:border-[#F09D51] transition-all duration-300 hover:cursor-pointer mt-4"
                >
                  Continue to Payment
                </button>
              </>
            )}

            {step === "payment" && (
              <>
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                    Payment
                  </p>

                  {/* Method selector */}
                  <div className="flex gap-4 mb-6">
                    {(["Card", "bKash"] as const).map((method) => (
                      <div
                        key={method}
                        onClick={() => setSelectedMethod(method)}
                        className={`flex-1 border px-4 py-3 text-sm text-center cursor-pointer transition-colors
                          ${
                            selectedMethod === method
                              ? "border-[#F09D51] bg-[#F09D51] text-white"
                              : "border-gray-200 bg-white text-[#222222] hover:border-[#F09D51]"
                          }`}
                      >
                        {method}
                      </div>
                    ))}
                  </div>

                  {/* Card fields */}
                  {selectedMethod === "Card" && (
                    <>
                      <input
                        type="text"
                        placeholder="Card number"
                        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors"
                      />
                      <div className="flex gap-4 mt-4">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-1/2 border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="w-1/2 border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Name on card"
                        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors mt-4"
                      />
                    </>
                  )}

                  {/* bKash fields */}
                  {selectedMethod === "bKash" && (
                    <input
                      type="text"
                      placeholder="bKash transaction ID"
                      className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#F09D51] transition-colors"
                    />
                  )}
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => setStep("details")}
                    className="w-1/3 py-4 border border-gray-300 text-gray-500 uppercase tracking-widest text-sm font-semibold hover:border-[#F09D51] hover:text-[#F09D51] transition-all duration-300 hover:cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      clearCart();
                      setStep("confirm");
                    }}
                    className="w-2/3 py-4 bg-[#F09D51] text-white uppercase tracking-widest text-sm font-semibold hover:bg-transparent hover:text-[#F09D51] hover:border hover:border-[#F09D51] transition-all duration-300 hover:cursor-pointer"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}

            {step === "confirm" && (
              <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-[#222222]">
                  Order Placed!
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  Thank you for your purchase. Your order has been confirmed and
                  will be delivered within 3–5 business days.
                </p>
                <p className="text-xs uppercase tracking-widest text-[#F09D51]">
                  Order #CH-{orderId}
                </p>
                <Link
                  href="/"
                  className="mt-4 py-3 px-8 bg-[#F09D51] text-white uppercase tracking-widest text-sm font-semibold hover:bg-transparent hover:text-[#F09D51] hover:border hover:border-[#F09D51] transition-all duration-300 hover:cursor-pointer"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Right — Order Summary */}
          {step !== "confirm" && (
            <div className="w-full min-[900px]:w-2/5">
              <div className="bg-white border border-gray-200 p-6 flex flex-col gap-5">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Order Summary
                </p>

                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-400">Your cart is empty.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-bold">
                            {item.quantity}
                          </div>
                          <p className="text-sm text-[#222222] font-semibold">
                            {item.title}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">
                          TK {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="h-px bg-gray-100" />

                <div className="flex flex-col gap-2 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>TK {Number(subtotal).toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p className="text-green-500">Free</p>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex justify-between font-bold text-[#222222]">
                  <p>Total</p>
                  <p className="text-[#F09D51]">
                    TK {Number(totalPrice).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#F09D51] transition-colors"
                  />
                  <button className="px-4 py-2 bg-[#222222] text-white text-sm uppercase tracking-wider hover:bg-[#F09D51] transition-colors hover:cursor-pointer">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
