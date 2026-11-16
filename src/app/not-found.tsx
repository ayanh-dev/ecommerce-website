import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#2874F0]">
          404
        </p>
        <h1 className="text-3xl font-bold text-slate-900">This page doesn’t exist</h1>
        <p className="mt-3 text-sm text-slate-600">
          The link may be broken or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#2874F0] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f66d8]"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
