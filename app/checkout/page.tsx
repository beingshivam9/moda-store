"use client";

import { useState } from "react";
import { getCart, clearCart } from "../store/cartStore";
import { useRouter } from "next/navigation";

import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Checkout() {
  const router = useRouter();
  const cart = getCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("COD");
  const [loading, setLoading] = useState(false);

  const valid =
    name.trim().length > 2 &&
    phone.trim().length >= 10 &&
    address.trim().length > 5;

  const placeOrder = async () => {
    if (!valid) {
      alert("Please fill all details correctly");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "orders"), {
        customer: {
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
        },
        items: cart,
        payment,
        total,
        status: "new",
        createdAt: serverTimestamp(),
      });

      clearCart();
      router.push("/success");
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b border-black/15 text-xl font-bold text-black sticky top-0 bg-white z-40">
        Checkout
      </div>

      {/* FORM CONTENT */}
      <div className="flex-1 p-4 space-y-4 pb-32">

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-black p-3 text-black"
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-black p-3 text-black"
        />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-black p-3 text-black"
        />

        {/* Payment */}
<div>
  <div className="font-semibold text-black mb-2">
    Payment Method
  </div>

  <div className="flex gap-2">
    
    {/* COD (Active) */}
    <button
      onClick={() => setPayment("COD")}
      className={`px-4 py-2 border font-medium ${
        payment === "COD"
          ? "bg-black text-white border-black"
          : "border-black text-black"
      }`}
    >
      COD
    </button>

    {/* UPI (Disabled) */}
    <button
      onClick={() => alert("UPI coming soon")}
      className="px-4 py-2 border font-medium border-black text-neutral-400 cursor-not-allowed"
    >
      UPI (Coming Soon)
    </button>

  </div>
</div>

      </div>

      {/* STICKY BOTTOM BAR */}
      <div className="sticky bottom-0 bg-white border-t border-black/15 p-4 z-50">

        <div className="flex justify-between mb-4 text-lg font-bold text-black">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          disabled={!valid || loading}
          onClick={placeOrder}
          className={`w-full py-4 text-lg font-semibold ${
            valid && !loading
              ? "bg-black text-white"
              : "bg-neutral-300 text-neutral-700"
          }`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>

    </div>
  );
}