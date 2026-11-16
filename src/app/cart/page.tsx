"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const delivery = subtotal > 5000 ? 0 : 149;
  const total = subtotal + delivery;

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-[900px] px-4 py-16 text-center">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Your cart is empty</h1>
          <p className="mt-3 text-slate-500">Add a few products and come back to complete your order.</p>
          <Link href="/products" className="mt-6 inline-flex rounded-xl bg-[#2874F0] px-5 py-3 text-sm font-semibold text-white">
            Explore products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">My Cart</h1>
        <span className="text-sm text-slate-500">{cart.length} items</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.7fr]">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">
              <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-slate-100">
                <Image src={item.images[0]} alt={item.name} fill className="object-cover" sizes="128px" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
                    <p className="text-sm text-slate-500">{item.brand}</p>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="inline-flex items-center gap-1 text-sm text-red-500">
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xl font-bold text-slate-900">{formatCurrency(item.price)}</span>
                  <span className="text-sm text-slate-400 line-through">{formatCurrency(item.mrp)}</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-slate-700">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-slate-700">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button type="button" className="text-sm font-medium text-[#2874F0]">Save for Later</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Price Details</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Item Total</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery Charges</span><span>{delivery === 0 ? "Free" : formatCurrency(delivery)}</span></div>
            <div className="flex justify-between"><span>Discount</span><span className="text-[#388E3C]">-₹0</span></div>
            <div className="border-t border-slate-200 pt-3 text-base font-bold text-slate-900 flex justify-between">
              <span>Total Amount</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-green-50 p-3 text-sm font-medium text-[#388E3C]">
            Total Savings ₹0
          </div>
          <Link href="/checkout" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#FB641B] px-5 py-3 text-sm font-bold text-white">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
