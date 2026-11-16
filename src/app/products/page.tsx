import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { categories, getProductsByCategory, getSortedProducts, products } from "@/lib/data";

function buildSearchUrl({
  category,
  sort,
  minPrice,
  search,
}: {
  category?: string;
  sort?: string;
  minPrice?: number;
  search?: string;
}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (sort) params.set("sort", sort);
  if (minPrice) params.set("minPrice", String(minPrice));
  if (search) params.set("search", search);
  return `/products${params.toString() ? `?${params.toString()}` : ""}`;
}

export default async function ProductCatalogPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const category = typeof params.category === "string" ? params.category : undefined;
  const sort = typeof params.sort === "string" ? params.sort : "featured";
  const minPrice = Number(typeof params.minPrice === "string" ? params.minPrice : 0);
  const search = typeof params.search === "string" ? params.search.toLowerCase() : "";

  let filtered = getProductsByCategory(category);

  if (search) {
    filtered = filtered.filter((product) => product.name.toLowerCase().includes(search));
  }

  if (minPrice > 0) {
    filtered = filtered.filter((product) => product.price >= minPrice);
  }

  const visibleProducts = getSortedProducts(filtered, sort);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-[#2874F0]">Home</Link>
        <span>/</span>
        <span className="font-medium text-slate-700">Products</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Filters</h2>
            <Link href="/products" className="text-xs font-semibold text-[#2874F0]">Clear all</Link>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Price</h3>
              <div className="space-y-2 text-sm text-slate-700">
                {[
                  [0, "Under ₹2,000"],
                  [2000, "₹2,000 - ₹5,000"],
                  [5000, "₹5,000 - ₹10,000"],
                  [10000, "₹10,000+"],
                ].map(([threshold, label]) => (
                  <Link
                    key={label}
                    href={buildSearchUrl({ category, sort, search, minPrice: Number(threshold) })}
                    className="flex items-center gap-2 rounded hover:bg-slate-100"
                  >
                    <input type="radio" checked={minPrice === Number(threshold)} readOnly />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Brand</h3>
              <div className="space-y-2 text-sm text-slate-700">
                {Array.from(new Set(products.map((product) => product.brand))).slice(0, 6).map((brand) => (
                  <label key={brand} className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Customer Ratings</h3>
              <div className="space-y-2 text-sm text-slate-700">
                {["4★ & above", "3★ & above", "2★ & above"].map((rating) => (
                  <label key={rating} className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{rating}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Category</h3>
              <div className="space-y-2 text-sm text-slate-700">
                {categories.map((item) => (
                  <Link key={item} href={buildSearchUrl({ category: item, sort, minPrice, search })} className="flex items-center justify-between rounded px-2 py-1 hover:bg-slate-100">
                    <span>{item}</span>
                    <span className="text-xs text-slate-400">
                      {getProductsByCategory(item).length}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-5">
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {category ? category : "All Products"}
              </h1>
              <p className="text-sm text-slate-500">{visibleProducts.length} items found</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {[
                ["featured", "Relevance"],
                ["price-low", "Price -- Low to High"],
                ["price-high", "Price -- High to Low"],
                ["rating", "Customer Ratings"],
              ].map(([value, label]) => (
                <Link
                  key={value}
                  href={buildSearchUrl({ category, sort: value, minPrice, search })}
                  className={`rounded-full px-3 py-1.5 ${sort === value ? "bg-[#2874F0] text-white" : "bg-slate-100 text-slate-700"}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
