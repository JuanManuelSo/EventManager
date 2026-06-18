import type { ReactNode } from "react";
import { Percent, UserCheck, Users } from "lucide-react";

export default function ScanStats({
  isLoading,
  stats,
}: {
  isLoading: boolean;
  stats: { total: number; present: number; pct: number };
}) {
  if (isLoading) {
    return <StatsSkeleton />;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-[0_1px_3px_rgb(0,0,0,0.04)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <CompactStat
            icon={<Users size={14} className="text-slate-400" />}
            label="Total"
            value={stats.total}
          />
          <CompactStat
            icon={<UserCheck size={14} className="text-emerald-500" />}
            label="Presentes"
            value={stats.present}
            valueClassName="text-emerald-600"
          />
          <CompactStat
            icon={<Percent size={14} className="text-blue-500" />}
            label="Asistencia"
            value={`${stats.pct}%`}
            valueClassName="text-blue-600"
          />
        </div>

        <div className="flex items-center gap-3 md:min-w-52">
          <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${stats.pct}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
            en vivo
          </span>
        </div>
      </div>
    </div>
  );
}

function CompactStat({
  icon,
  label,
  value,
  valueClassName = "text-slate-900",
}: {
  icon?: ReactNode;
  label: string;
  value: string | number;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </span>
      <span
        className={`text-sm font-semibold tracking-tight ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-24 bg-slate-100 rounded animate-pulse"
            />
          ))}
        </div>
        <div className="h-1.5 md:w-52 bg-slate-100 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
