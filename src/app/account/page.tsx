import Link from "next/link";
import { PackageCheck, Heart, MapPin, ReceiptText } from "lucide-react";

const orders = [
  { id: "#FD1024", status: "Delivered", date: "12 Nov 2026", amount: "₹4,299" },
  { id: "#FD1029", status: "Shipped", date: "14 Nov 2026", amount: "₹29,999" },
  { id: "#FD1032", status: "Packed", date: "16 Nov 2026", amount: "₹1,299" },
];

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <h1 className="text-3xl font-bold text-slate-900">Ayan Singh</h1>
        </div>
        <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          Continue shopping
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <PackageCheck className="h-5 w-5 text-[#2874F0]" />
              <h2 className="text-xl font-bold text-slate-900">Order History</h2>
            </div>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-900">{order.id}</div>
                      <div className="text-xs text-slate-500">{order.date}</div>
                    </div>
                    <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-[#388E3C]">{order.status}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                    <span>Ordered</span>
                    <span>→</span>
                    <span>Packed</span>
                    <span>→</span>
                    <span>Shipped</span>
                    <span>→</span>
                    <span>Delivered</span>
                  </div>
                  <div className="mt-4 text-sm font-semibold text-slate-900">{order.amount}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Heart className="h-5 w-5 text-[#2874F0]" />
              <h2 className="text-xl font-bold text-slate-900">Wishlist</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Samsung Galaxy M35 5G",
                "LG Ultra HD 55-inch Smart TV",
                "Denim Classic Jacket",
                "Organic Rice 5kg",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#2874F0]" />
              <h2 className="text-xl font-bold text-slate-900">Saved Addresses</h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-xl bg-slate-50 p-3">1st Floor, MG Road, Bengaluru, Karnataka</div>
              <div className="rounded-xl bg-slate-50 p-3">2nd Street, Koramangala, Bengaluru</div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <ReceiptText className="h-5 w-5 text-[#2874F0]" />
              <h2 className="text-xl font-bold text-slate-900">Coupons</h2>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-xl bg-yellow-50 p-3 font-medium text-amber-800">SAVE10 • ₹10 off on selected items</div>
              <div className="rounded-xl bg-green-50 p-3 font-medium text-green-700">FIRSTORDER • Free shipping over ₹500</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
