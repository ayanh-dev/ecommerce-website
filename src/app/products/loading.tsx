export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="mb-6 h-12 animate-pulse rounded-xl bg-slate-200" />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="h-[500px] animate-pulse rounded-2xl bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-80 animate-pulse rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
