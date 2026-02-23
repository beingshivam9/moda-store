// store/cartStore.tsx

export type CartItem = {
  id: number;          // cart item id
  productId: number;   // actual product reference
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image?: string;
};

const STORAGE_KEY = "moda_cart";

/* ================= LOAD ================= */
function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

/* ================= SAVE ================= */
function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/* ================= GET ================= */
export function getCart(): CartItem[] {
  return loadCart();
}

/* ================= ADD ================= */
export function addToCart(
  item: Omit<CartItem, "quantity">
) {
  const cart = loadCart();

  const existing = cart.find(
    (i) =>
      i.productId === item.productId &&
      i.size === item.size &&
      i.color === item.color
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}

/* ================= INCREASE ================= */
export function increaseQty(id: number) {
  const cart = loadCart();
  const item = cart.find((i) => i.id === id);

  if (item) item.quantity += 1;

  saveCart(cart);
}

/* ================= DECREASE ================= */
export function decreaseQty(id: number) {
  let cart = loadCart();
  const item = cart.find((i) => i.id === id);

  if (!item) return;

  if (item.quantity === 1) {
    cart = cart.filter((i) => i.id !== id);
  } else {
    item.quantity -= 1;
  }

  saveCart(cart);
}

/* ================= CLEAR ================= */
export function clearCart() {
  saveCart([]);
}