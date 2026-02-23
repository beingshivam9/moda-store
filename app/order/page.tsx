"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    const storedPhone = localStorage.getItem("moda_user_phone");
    setPhone(storedPhone);

    if (!storedPhone) return;

    const q = query(
      collection(db, "orders"),
      where("customer.phone", "==", storedPhone)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setOrders(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4">

      <div className="text-2xl font-bold mb-6 text-black">
        My Orders
      </div>

      {!phone && (
        <div className="text-black">
          No orders found on this device.
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} className="border border-black/20 rounded-xl p-4 mb-4">

          <div className="font-bold text-black mb-2">
            Status: {order.status}
          </div>

          {order.items.map((item: any, i: number) => (
            <div key={i} className="flex justify-between text-black text-sm mb-1">
              <span>
                {item.name} ({item.size}, {item.color}) ×{item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="flex justify-between font-bold mt-3 text-black">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>

        </div>
      ))}

    </div>
  );
}