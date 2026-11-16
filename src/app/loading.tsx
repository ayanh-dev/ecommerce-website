export default function Loading() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="animate-pulse space-y-6">
        <div className="h-24 rounded-2xl bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-80 rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
