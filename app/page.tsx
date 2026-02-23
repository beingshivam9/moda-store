"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background Image */}
      <img
        src="/images/landing-bg.jpg"
        alt="Landing Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-8 text-center">

        <h1 className="text-6xl font-light tracking-[0.4em]">
          POOJA
        </h1>

        <p className="mt-4 text-lg tracking-widest opacity-80">
          BOUTIQUE
        </p>

        {/* Enter Shop */}
        <button
          onClick={() => router.push("/home")}
          className="mt-12 bg-white text-black w-full max-w-xs py-4 rounded-full text-lg font-medium hover:scale-105 transition duration-300"
        >
          Enter Shop
        </button>

        {/* Visit Store */}
        <button
          onClick={() => router.push("/visit-store")}
          className="mt-4 border border-white w-full max-w-xs py-4 rounded-full text-lg hover:bg-white hover:text-black transition duration-300"
        >
          Visit Store
        </button>

      </div>
    </div>
  );
}