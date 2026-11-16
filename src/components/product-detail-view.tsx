"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, Truck, WalletCards } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/data";
import { formatCurrency, getDiscountPercent } from "@/lib/utils";

export function ProductDetailView({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/products">Products</Link>
        <span>/</span>
        <span className="text-slate-700">{product.name}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[120px_1fr]">
            <div className="grid gap-3">
              {product.images.map((image, index) => (
                <div key={`${product.slug}-${index}`} className="relative h-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <Image src={image} alt={`${product.name} view ${index + 1}`} fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
            <div className="relative h-[500px] overflow-hidden rounded-2xl bg-slate-100">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="rounded-xl bg-[#FF9F00] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#f59900]"
            >
              ADD TO CART
            </button>
            <button type="button" className="rounded-xl bg-[#FB641B] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#ea5114]">
              BUY NOW
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>{product.brand}</span>
              <span>•</span>
              <span>{product.category}</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded bg-[#388E3C] px-2 py-1 text-sm font-semibold text-white">
                {product.rating} <Star className="h-3.5 w-3.5 fill-current" />
              </span>
              <span className="text-sm text-slate-600">{product.reviewCount.toLocaleString()} Reviews</span>
            </div>
            <div className="mt-5 flex items-end gap-3">
              <span className="text-4xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
              <span className="text-lg text-slate-400 line-through">{formatCurrency(product.mrp)}</span>
              <span className="text-base font-semibold text-[#388E3C]">{getDiscountPercent(product.mrp, product.price)}% off</span>
            </div>

            <div className="mt-5 space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-2"><WalletCards className="h-4 w-4 text-[#2874F0]" /> Bank offer available</div>
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-[#2874F0]" /> Free delivery by {product.deliveryDays} days</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#2874F0]" /> 12 months warranty & secure delivery</div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <input
                  defaultValue="560001"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                  aria-label="Delivery pincode"
                />
                <button type="button" className="rounded-lg bg-[#2874F0] px-4 py-2 text-sm font-semibold text-white">
                  Check
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-500">Delivery by Tue, 26 Nov</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Product Highlights</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="rounded-xl border border-slate-200 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{key}</div>
                  <div className="mt-1 text-sm font-medium text-slate-800">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Description</h2>
          <p className="mt-3 text-slate-600">{product.description}</p>
          <div className="mt-6 space-y-3">
            {product.tags.map((tag) => (
              <span key={tag} className="mr-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2874F0]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Seller Information</h2>
          <div className="mt-4 rounded-xl border border-slate-200 p-4">
            <div className="text-lg font-semibold text-slate-900">{product.seller}</div>
            <div className="mt-2 text-sm text-slate-600">Top Rated Seller</div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>Shipping</span>
              <span className="font-semibold text-[#388E3C]">Fast</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Customer Reviews</h2>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-[#2874F0]">
            Continue shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 text-[#388E3C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="mt-2 text-sm text-slate-700">Very good product, great value for money and quick delivery.</div>
              <div className="mt-2 text-xs text-slate-500">Verified Buyer • {item} day ago</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
