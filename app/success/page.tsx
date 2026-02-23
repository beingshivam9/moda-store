"use client";

import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white text-center p-6">

      <div className="text-6xl mb-4">✓</div>

      <div className="text-2xl font-bold text-black">
        Order Placed!
      </div>

      <div className="text-neutral-800 mt-2">
        Your order has been confirmed.
        The store will contact you soon.
      </div>

      <button
        onClick={() => router.push("/home")}
        className="mt-8 bg-black text-white px-8 py-4 rounded-full text-lg font-semibold"
      >
        Continue Shopping
      </button>

    </div>
  );
}