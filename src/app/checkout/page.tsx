"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CreditCard, Landmark, MapPin, ShieldCheck, Wallet } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/utils";

const stepLabels = ["Login", "Delivery", "Order", "Payment"];

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const [step, setStep] = useState(1);
  const delivery = subtotal > 5000 ? 0 : 149;
  const total = subtotal + delivery;

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-[900px] px-4 py-16 text-center">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Checkout is empty</h1>
          <Link href="/products" className="mt-6 inline-flex rounded-xl bg-[#2874F0] px-5 py-3 text-sm font-semibold text-white">
            Go shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {stepLabels.map((label, index) => (
          <div key={label} className="flex items-center gap-2 text-sm">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index + 1 <= step ? "bg-[#2874F0] text-white" : "bg-slate-200 text-slate-600"}`}>
              {index + 1 <= step ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <span className={index + 1 <= step ? "font-semibold text-slate-900" : "text-slate-500"}>{label}</span>
            {index < stepLabels.length - 1 && <span className="text-slate-400">→</span>}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.7fr]">
        <div className="space-y-5">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900">Login & account</h2>
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  Logged in as <span className="font-semibold">ayan@demo.com</span>
                </div>
                <button type="button" onClick={() => setStep(2)} className="mt-5 rounded-xl bg-[#2874F0] px-5 py-3 text-sm font-bold text-white">
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900">Delivery address</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input defaultValue="Ayan Singh" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Full name" />
                  <input defaultValue="560001" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Pincode" />
                  <input defaultValue="Bengaluru" className="rounded-xl border border-slate-200 px-3 py-2 text-sm md:col-span-2" placeholder="City" />
                  <textarea defaultValue="1st Floor, MG Road, Bengaluru, Karnataka" className="min-h-28 rounded-xl border border-slate-200 px-3 py-2 text-sm md:col-span-2" placeholder="Address" />
                </div>
                <button type="button" onClick={() => setStep(3)} className="mt-5 rounded-xl bg-[#2874F0] px-5 py-3 text-sm font-bold text-white">
                  Save & continue
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
                <div className="mt-4 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 text-sm text-slate-700">
                      <span>{item.name}</span>
                      <span>{item.quantity} x {formatCurrency(item.price)}</span>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setStep(4)} className="mt-5 rounded-xl bg-[#2874F0] px-5 py-3 text-sm font-bold text-white">
                  Continue to payment
                </button>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900">Payment options</h2>
                <div className="mt-4 space-y-3">
                  {[
                    ["UPI", <Wallet className="h-4 w-4" />],
                    ["Credit / Debit Card", <CreditCard className="h-4 w-4" />],
                    ["Net Banking", <Landmark className="h-4 w-4" />],
                    ["Cash on Delivery", <MapPin className="h-4 w-4" />],
                  ].map(([label, icon]) => (
                    <label key={String(label)} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700">
                      <input type="radio" name="payment" />
                      {icon}
                      <span>{String(label)}</span>
                    </label>
                  ))}
                </div>
                <button type="button" onClick={() => setStep(4)} className="mt-5 rounded-xl bg-[#388E3C] px-5 py-3 text-sm font-bold text-white">
                  Place Order
                </button>
              </div>
            )}
          </section>
        </div>

        <aside className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Item Total</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatCurrency(delivery)}</span></div>
            <div className="flex justify-between"><span>Discount</span><span className="text-[#388E3C]">-₹0</span></div>
            <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm font-medium text-[#388E3C]">
            <ShieldCheck className="h-4 w-4" /> Secure checkout
          </div>
        </aside>
      </div>
    </div>
  );
}
