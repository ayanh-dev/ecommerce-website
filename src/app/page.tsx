import Link from "next/link";
import { ArrowRight, ChevronRight, Smartphone, Star } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/data";

const heroSlides = [
  {
    title: "Best of Electronics",
    subtitle: "Up to 70% off on gadgets and essentials",
    bg: "from-blue-700 via-blue-600 to-cyan-500",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Fresh Fashion Finds",
    subtitle: "Trending styles from top brands",
    bg: "from-fuchsia-600 via-violet-600 to-indigo-500",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Home Upgrades",
    subtitle: "Curated furniture and décor deals",
    bg: "from-emerald-600 via-green-500 to-teal-500",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function HomePage() {
  const featured = products.slice(0, 5);
  const topDeals = products.slice(5, 11);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="rounded-2xl bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="flex min-w-[120px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <Smartphone className="h-4 w-4 text-[#2874F0]" />
              {category}
            </Link>
          ))}
        </div>
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="grid md:grid-cols-[1.2fr_0.8fr]">
          <div className="relative h-72 overflow-hidden md:h-80">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2874F0] via-[#1f5fd2] to-[#4ab4ff]" />
            <div className="relative flex h-full items-center justify-between px-6 text-white md:px-10">
              <div className="max-w-md">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Latest Offers</p>
                <h1 className="mt-3 text-3xl font-bold md:text-5xl">Big savings on your everyday essentials.</h1>
                <div className="mt-5 flex items-center gap-3">
                  <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-[#FFE500] px-5 py-2.5 text-sm font-bold text-slate-900">
                    Shop now <ArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="rounded-full border border-white/40 px-3 py-1 text-xs font-medium">Up to 80% off</span>
                </div>
              </div>
              <div className="hidden h-52 w-52 rounded-3xl bg-white/10 ring-1 ring-white/20 md:block" />
            </div>
          </div>

          <div className="grid gap-3 p-3">
            {heroSlides.map((slide) => (
              <div key={slide.title} className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${slide.bg} p-5 text-white`}>
                <div className="absolute inset-0 opacity-30">
                  <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                </div>
                <div className="relative">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Flash sale</div>
                  <h2 className="mt-3 text-2xl font-bold">{slide.title}</h2>
                  <p className="mt-2 text-sm text-white/80">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Best of Electronics</h2>
            <p className="text-sm text-slate-500">Smart gadgets with premium deals</p>
          </div>
          <Link href="/products?category=Electronics" className="inline-flex items-center gap-1 text-sm font-semibold text-[#2874F0]">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Top Deals</h2>
            <p className="text-sm text-slate-500">Trending products with the best discounts</p>
          </div>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-[#2874F0]">
            Explore <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {topDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { title: "Top Rated", icon: Star, text: "Rated 4.5+ by shoppers" },
          { title: "Safe Payments", icon: Star, text: "UPI, cards and COD options" },
          { title: "Fast Delivery", icon: Star, text: "2-7 day fulfilment across India" },
        ].map(({ title, text, icon: Icon }) => (
          <div key={title} className="rounded-2xl bg-white p-5 shadow-sm">
            <Icon className="mb-3 h-8 w-8 text-[#2874F0]" />
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-500">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
