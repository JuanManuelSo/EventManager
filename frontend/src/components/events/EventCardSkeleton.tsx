export default function EventCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-brand-dark border border-white/5 shadow-[0_1px_4px_rgb(0,0,0,0.14)]">
      {/* Cover skeleton */}
      <div className="h-37 bg-slate-800 animate-pulse" />

      {/* Body skeleton */}
      <div className="px-4 pt-3 pb-4 space-y-3">
        {/* Title */}
        <div className="h-3.5 w-4/5 bg-slate-800 rounded animate-pulse" />

        {/* Meta rows */}
        <div className="space-y-2">
          <div className="h-2.5 w-3/5 bg-slate-800/70 rounded animate-pulse" />
          <div className="h-2.5 w-2/5 bg-slate-800/70 rounded animate-pulse" />
        </div>

        {/* Footer */}
        <div className="border-t border-white/6 pt-3 flex items-center justify-between">
          <div className="h-2.5 w-24 bg-slate-800/70 rounded animate-pulse" />
          <div className="h-3   w-3  bg-slate-800/70 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
