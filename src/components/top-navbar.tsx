"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { categories, products } from "@/lib/data";
import { useCart } from "@/components/cart-provider";

export function TopNavbar() {
  const router = useRouter();
  const { cartCount, wishlist } = useCart();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("flipkart-search-history");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return products
      .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6)
      .map((product) => product.name);
  }, [query]);

  const handleSearch = (nextQuery?: string) => {
    const searchTerm = (nextQuery ?? query).trim();
    if (!searchTerm) return;

    const nextRecent = [searchTerm, ...recentSearches.filter((item) => item !== searchTerm)].slice(0, 5);
    setRecentSearches(nextRecent);
    localStorage.setItem("flipkart-search-history", JSON.stringify(nextRecent));
    router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="bg-[#2874F0] text-white shadow-sm sticky top-0 z-40">
      <div className="mx-auto max-w-[1280px] px-4 py-3">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-white" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="text-2xl font-black tracking-tight">Flipkart</div>
            <div className="flex items-center text-[10px] font-semibold text-yellow-300">
              Explore <span className="text-yellow-100">Plus</span>
            </div>
          </Link>

          <div className="relative hidden flex-1 md:block">
            <div className="flex items-center rounded-md bg-white px-3 py-2 text-slate-700 shadow-sm">
              <Search className="mr-2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSearch();
                }}
                placeholder="Search for products, brands and more"
                className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
              <select className="ml-3 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700 outline-none">
                <option>All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-xl">
                {suggestions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm hover:bg-slate-100"
                    onClick={() => handleSearch(name)}
                  >
                    <Search className="h-3.5 w-3.5 text-slate-400" /> {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative ml-auto hidden sm:block">
            <button
              onClick={() => setShowProfileMenu((current) => !current)}
              className="flex items-center gap-2 rounded bg-white px-3 py-2 text-sm font-medium text-[#2874F0] shadow-sm"
            >
              <User className="h-4 w-4" />
              My Account
              <ChevronDown className="h-4 w-4" />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-xl bg-white p-2 text-slate-700 shadow-xl">
                {[
                  ["My Profile", "/account"],
                  ["Orders", "/account"],
                  ["Wishlist", "/account"],
                  ["Coupons", "/account"],
                  ["Logout", "/"],
                ].map(([label, path]) => (
                  <Link
                    href={path}
                    key={label}
                    className="block rounded px-3 py-2 text-sm hover:bg-slate-100"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/admin" className="hidden text-sm font-medium text-white/90 lg:block">
            Become a Seller
          </Link>

          <div className="hidden items-center gap-3 text-sm text-white/90 lg:flex">
            <span>More</span>
            <ChevronDown className="h-4 w-4" />
          </div>

          <Link href="/cart" className="relative ml-auto flex items-center gap-2 rounded bg-white/10 px-3 py-2 font-medium sm:ml-0">
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
            <span className="rounded-full bg-[#FF9F00] px-2 py-0.5 text-xs font-bold text-white">{cartCount}</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#2874F0] px-4 py-2 text-white md:hidden">
        <div className="mx-auto flex max-w-[1280px] items-center gap-2 overflow-x-auto">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSearch();
            }}
            placeholder="Search products"
            className="w-full rounded bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-2">
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 text-sm font-medium text-white/90">
          {categories.slice(0, 8).map((category) => (
            <Link href={`/products?category=${encodeURIComponent(category)}`} key={category} className="whitespace-nowrap">
              {category}
            </Link>
          ))}
          <Link href="/account" className="flex items-center gap-1 whitespace-nowrap">
            <Heart className="h-4 w-4" />{wishlist.length}
          </Link>
        </div>
      </div>
    </header>
  );
}
