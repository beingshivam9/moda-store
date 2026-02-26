"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden overscroll-none">

      {/* Background Image */}
      <img
        src="/images/landing-bg.jpg"
        alt="Landing Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-8 text-center">

        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Pooja Boutique Logo"
          className="w-72 drop-shadow-[0_8px_25px_rgba(0,0,0,0.8)]"
        />

        {/* Enter Shop */}
        <button
          onClick={() => router.push("/home")}
          className="mt-12 bg-[#2e7d5b] text-white w-full max-w-xs py-4 rounded-full text-lg font-medium hover:bg-[#25664a] hover:scale-105 transition duration-300"
        >
          Enter Shop
        </button>

        {/* Visit Store */}
        <button
          onClick={() => router.push("/visit-store")}
          className="mt-4 border border-[#6bbf9b] text-[#6bbf9b] w-full max-w-xs py-4 rounded-full text-lg hover:bg-[#2e7d5b] hover:text-white transition duration-300"
        >
          Visit Store
        </button>

      </div>

      {/* Footer */}
    <a
  href="https://plasma-studios.web.app"
  target="_blank"
  rel="noopener noreferrer"
  className="absolute bottom-8 z-20 w-full text-center text-xs tracking-wider text-white/60 hover:text-white transition"
>
  © {new Date().getFullYear()} Plasma Studios Pvt Ltd.
</a>

    </div>
  );
}