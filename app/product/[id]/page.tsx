"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { addToCart } from "../../store/cartStore";

type ProductType = {
  name: string;
  price: number;
  imageBase64?: string;
  sizes?: string[];
  colors?: string[];
};

export default function Product() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<ProductType | null>(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data() as ProductType);
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <div className="flex-1 pb-24">

        {/* IMAGE */}
        <div className="w-full h-[55vh] bg-neutral-200">
          <img
            src={
              product.imageBase64?.startsWith("data")
                ? product.imageBase64
                : "/placeholder.png"
            }
            className="w-full h-full object-cover"
            alt={product.name}
          />
        </div>

        {/* DETAILS */}
        <div className="p-4">

          <div className="text-xl font-bold text-black">
            {product.name}
          </div>

          <div className="text-2xl font-bold mt-1 text-black">
            ₹{product.price}
          </div>

          {/* SIZE */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-semibold mb-2 text-black">
                Select Size
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 border text-sm font-medium
                    ${
                      size === s
                        ? "bg-black text-white border-black"
                        : "border-black text-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COLOR */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-semibold mb-2 text-black">
                Select Color
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 border text-sm font-medium
                    ${
                      color === c
                        ? "bg-black text-white border-black"
                        : "border-black text-black"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* STICKY BUTTON */}
      <div className="sticky bottom-0 bg-white border-t p-4 z-50">
        <button
          disabled={
            (product.sizes?.length ? !size : false) ||
            (product.colors?.length ? !color : false)
          }
          onClick={() => {
            addToCart({
              id: Date.now(),
              productId: Number(productId),
              name: product.name,
              price: product.price,
              image: product.imageBase64,
              size,
              color,
            });

            router.push("/cart");
          }}
          className={`w-full py-4 text-lg font-semibold
          ${
            (product.sizes?.length && !size) ||
            (product.colors?.length && !color)
              ? "bg-neutral-300 text-neutral-700"
              : "bg-black text-white"
          }`}
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}