import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 text-sm text-slate-600 md:grid-cols-4">
        <div>
          <h4 className="mb-3 font-semibold text-slate-900">About</h4>
          <ul className="space-y-2">
            <li><Link href="/">Contact Us</Link></li>
            <li><Link href="/">About Us</Link></li>
            <li><Link href="/">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-slate-900">Help</h4>
          <ul className="space-y-2">
            <li><Link href="/">Payments</Link></li>
            <li><Link href="/">Shipping</Link></li>
            <li><Link href="/">Cancellation</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-slate-900">Policy</h4>
          <ul className="space-y-2">
            <li><Link href="/">Return Policy</Link></li>
            <li><Link href="/">Terms of Use</Link></li>
            <li><Link href="/">Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-slate-900">Social</h4>
          <ul className="space-y-2">
            <li><Link href="/">Facebook</Link></li>
            <li><Link href="/">Twitter</Link></li>
            <li><Link href="/">Instagram</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 py-4 text-center text-xs text-slate-500">
        © 2026 Flipkart-inspired storefront. Built for demo and learning.
      </div>
    </footer>
  );
}
