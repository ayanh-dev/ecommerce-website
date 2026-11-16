"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/data";
import { formatCurrency, getDiscountPercent } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const isSaved = isWishlisted(product.id);

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative h-56 overflow-hidden bg-slate-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border ${
            isSaved ? "border-red-200 bg-red-50 text-red-500" : "border-slate-200 bg-white/90 text-slate-500"
          } shadow-sm`}
          aria-label="Wishlist"
        >
          <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="space-y-3 p-4">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="line-clamp-2 min-h-[48px] text-sm font-medium text-slate-800">{product.name}</h3>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 rounded bg-[#388E3C] px-2 py-1 font-semibold text-white">
              <Star className="h-3 w-3 fill-current" />{product.rating}
            </span>
            <span>{product.reviewCount.toLocaleString()} Reviews</span>
          </div>
        </Link>

        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
          <span className="text-sm text-slate-400 line-through">{formatCurrency(product.mrp)}</span>
          <span className="text-xs font-semibold text-[#388E3C]">{getDiscountPercent(product.mrp, product.price)}% off</span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 text-xs text-slate-500">
          <span className="rounded bg-emerald-50 px-2 py-1 font-medium text-emerald-700">Free Delivery</span>
          <span className="rounded bg-amber-50 px-2 py-1 font-medium text-amber-700">Assured</span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF9F00] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#f59400]"
        >
          <ShoppingCart className="h-4 w-4" /> Add to cart
        </button>
      </div>
    </article>
  );
}
