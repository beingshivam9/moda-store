"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

/* ================= IMAGE COMPRESS FUNCTION ================= */
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const MAX_WIDTH = 600;
        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 0.7 = compression quality
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

        resolve(compressedBase64);
      };
    };
  });
};

/* ================= MAIN ADMIN ================= */
export default function Admin() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProducts(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  /* ================= SAVE PRODUCT ================= */
  const saveProduct = async () => {
    if (!name || !price) {
      alert("Enter Name and Price");
      return;
    }

    setLoading(true);

    try {
      let base64Image = preview;

      if (file) {
        base64Image = await compressImage(file);
      }

      const finalData = {
        name,
        price: Number(price),
        category,
        imageBase64: base64Image || "",
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), finalData);
      } else {
        await addDoc(collection(db, "products"), {
          ...finalData,
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
    } catch (error) {
      console.error("ERROR:", error);
      alert("Upload Failed");
    }

    setLoading(false);
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("Men");
    setPreview(null);
    setFile(null);
    setEditingId(null);
  };

  /* ================= EDIT ================= */
  const openEdit = (p: any) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category);
    setPreview(p.imageBase64);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-white p-10 font-bold uppercase">
      <h1 className="text-2xl mb-6">Inventory Panel</h1>

      {/* FORM */}
      <div className="border-4 border-black p-6 rounded-2xl max-w-md mb-10">
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-2 border-black p-2 mb-4"
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border-2 border-black p-2 mb-4"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border-2 border-black p-2 mb-4"
        >
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>

        <label className="block border-2 border-dashed border-black p-4 text-center cursor-pointer mb-4">
          {preview ? (
            <img src={preview} className="h-32 mx-auto object-cover" />
          ) : (
            "Upload Image"
          )}

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFile(f);
                setPreview(URL.createObjectURL(f));
              }
            }}
          />
        </label>

        <button
          onClick={saveProduct}
          disabled={loading}
          className="w-full bg-black text-white py-3"
        >
          {loading ? "Saving..." : editingId ? "Update" : "Save"}
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border-4 border-black p-4 rounded-xl"
          >
            {p.imageBase64 ? (
              <img
                src={p.imageBase64}
                className="w-full h-48 object-cover mb-3"
              />
            ) : null}

            <p className="text-xs opacity-40">{p.category}</p>
            <h3 className="text-lg">{p.name}</h3>
            <p className="text-xl">₹{p.price}</p>

            <div className="flex gap-4 mt-4 text-sm underline">
              <button onClick={() => openEdit(p)}>Edit</button>
              <button
                onClick={() =>
                  deleteDoc(doc(db, "products", p.id))
                }
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}