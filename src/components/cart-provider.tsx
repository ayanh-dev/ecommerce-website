"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/data";

type CartProduct = Product & { quantity: number };

type Toast = {
  id: number;
  message: string;
  tone: "success" | "info";
};

type CartContextValue = {
  cart: CartProduct[];
  wishlist: string[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  subtotal: number;
  toast: Toast | null;
  dismissToast: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("flipkart-cart");
    const savedWishlist = localStorage.getItem("flipkart-wishlist");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("flipkart-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("flipkart-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = (product: Product, qty = 1) => {
    setCart((current) => {
      const productIndex = current.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        const updated = [...current];
        updated[productIndex] = {
          ...updated[productIndex],
          quantity: updated[productIndex].quantity + qty,
        };
        return updated;
      }

      return [...current, { ...product, quantity: qty }];
    });

    setToast({ id: Date.now(), message: `${product.name} added to cart`, tone: "success" });
  };

  const removeFromCart = (productId: string) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, qty) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((current) => {
      if (current.includes(product.id)) {
        setToast({ id: Date.now(), message: `${product.name} removed from wishlist`, tone: "info" });
        return current.filter((id) => id !== product.id);
      }

      setToast({ id: Date.now(), message: `${product.name} saved to wishlist`, tone: "success" });
      return [...current, product.id];
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      isWishlisted,
      cartCount,
      subtotal,
      toast,
      dismissToast: () => setToast(null),
    }),
    [cart, wishlist, toast, cartCount, subtotal],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
          {toast.message}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
