"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart } from "../store/cartStore";
import { db } from "../../lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export default function Home() {
  const router = useRouter();

  const [category, setCategory] = useState("Men");
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCTS (ONE TIME FAST FETCH) ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          orderBy("createdAt", "desc"),
          limit(8)
        );

        const snapshot = await getDocs(q);

        const data: any[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setProducts(data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  /* ================= CART BADGE ================= */
  useEffect(() => {
    const update = () => {
      const total = getCart().reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(total);
    };

    update();
    const interval = setInterval(update, 500);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products.filter(
  (p) =>
    p.category === category &&
    p.isVisible !== false   // 🔥 hide if false
);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-40">
        <div className="text-xl font-semibold tracking-widest text-black">
          POOJA BOUTIQUE
        </div>

        <div className="relative">
          <button
            onClick={() => router.push("/cart")}
            className="text-2xl"
          >
            🛒
          </button>

          {cartCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center">
              {cartCount}
            </div>
          )}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="flex-1 p-3 pb-20">

        <div className="grid grid-cols-2 gap-3">

          {/* SKELETON LOADER */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full h-56 bg-neutral-200"></div>
                <div className="px-2 py-2 space-y-2">
                  <div className="h-3 bg-neutral-200 w-3/4"></div>
                  <div className="h-3 bg-neutral-200 w-1/2"></div>
                </div>
              </div>
            ))}

          {/* REAL PRODUCTS */}
          {!loading &&
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() =>
                  router.push(`/product/${product.id}`)
                }
                className="cursor-pointer active:opacity-70"
              >
                <img
                  src={
                    product.imageBase64?.startsWith("data")
                      ? product.imageBase64
                      : "/placeholder.png"
                  }
                  className="w-full h-56 object-cover"
                />

                <div className="px-2 py-2">
                  <div className="text-[13px] font-medium text-black truncate">
                    {product.name}
                  </div>

                  <div className="text-[14px] font-semibold text-black">
                    ₹{product.price}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center mt-10 text-neutral-500">
            No products found.
          </div>
        )}
      </div>

      {/* CATEGORY TABS */}
      <div className="sticky bottom-0 border-t bg-white py-3 flex justify-around z-40">
        {["Men", "Women", "Kids"].map((tab) => (
          <button
            key={tab}
            onClick={() => setCategory(tab)}
            className={`text-sm font-medium ${
              category === tab ? "text-black" : "text-neutral-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}