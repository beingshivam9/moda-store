"use client";

import { getCart, increaseQty, decreaseQty } from "../store/cartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const [, refresh] = useState(0);
  const cart = getCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b border-black/15 text-xl font-bold text-black sticky top-0 bg-white z-40">
        Your Cart
      </div>

      {/* ITEMS */}
      <div className="flex-1 pb-28">

        {cart.length === 0 && (
          <div className="flex items-center justify-center h-full text-neutral-800 text-lg">
            Cart is empty
          </div>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 p-4 border-b border-black/15"
          >
            <img
              src={
                item.image && item.image.startsWith("data")
                  ? item.image
                  : "/placeholder.png"
              }
              className="w-20 h-28 object-cover"
            />

            <div className="flex-1">

              <div className="font-bold text-black text-base">
                {item.name}
              </div>

              {item.size && (
                <div className="text-neutral-800 text-sm mt-1">
                  Size: {item.size}
                </div>
              )}

              {item.color && (
                <div className="text-neutral-800 text-sm">
                  Color: {item.color}
                </div>
              )}

              <div className="font-bold mt-2 text-black text-lg">
                ₹{item.price}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-3">

                <button
                  onClick={() => {
                    decreaseQty(item.id);
                    refresh((n) => n + 1);
                  }}
                  className="w-9 h-9 border border-black text-lg font-bold text-black active:scale-95"
                >
                  −
                </button>

                <span className="font-bold text-lg text-black">
                  {item.quantity}
                </span>

                <button
                  onClick={() => {
                    increaseQty(item.id);
                    refresh((n) => n + 1);
                  }}
                  className="w-9 h-9 bg-black text-white text-lg font-bold active:scale-95"
                >
                  +
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* STICKY CHECKOUT */}
      <div className="sticky bottom-0 bg-white border-t border-black/15 p-4 z-50">

        <div className="flex justify-between mb-4 text-xl font-bold text-black">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={() => router.push("/checkout")}
          disabled={cart.length === 0}
          className={`w-full py-4 text-lg font-semibold ${
            cart.length === 0
              ? "bg-neutral-300 text-neutral-600"
              : "bg-black text-white"
          }`}
        >
          Checkout
        </button>

      </div>

    </div>
  );
}