"use client";

import { useRouter } from "next/navigation";

export default function VisitStore() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f4f3f1] flex justify-center items-start py-10 px-4">
      
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center px-6 py-5 border-b">
          <button
            onClick={() => router.back()}
            className="text-2xl"
          >
            ←
          </button>
          <h1 className="text-xl font-semibold ml-4">
            Visit Store Location
          </h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Map */}
          <img
            src="/images/map.jpg"
            alt="Store Location"
            className="rounded-2xl w-full h-48 object-cover"
          />

          {/* Store Info */}
          <div>
            <h2 className="text-xl font-semibold">
              POOJA Boutique
            </h2>

            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
             Kajri designer studio,<br />
              Nerul East, Sector 15,<br />
              Nerul, Navi Mumbai<br />
              Maharashtra 400706
            </p>

            <p className="mt-3 text-sm text-gray-700">
              Open · Closes 10:30 PM
            </p>

            <p className="mt-1 text-sm text-gray-700">
              📞 063775 08531
            </p>

            {/* Get Directions Button */}
            <button
              onClick={() =>
                window.open(
                  "https://share.google/c0pSXoVquV6PzbnGA",
                  "_blank"
                )
              }
              className="mt-5 w-full py-3 rounded-full bg-black text-white font-medium hover:scale-105 transition duration-300"
            >
              Get Directions
            </button>
          </div>

          {/* Owner Image */}
          <div>
            <img
              src="/images/owner.jpg"
              alt="Boutique Owner"
              className="rounded-2xl w-full h-64 object-cover"
            />

            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              Visit our boutique in the heart of Nerul East. 
              We specialize in curated fashion pieces and 
              personalized styling. We look forward to 
              welcoming you!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}