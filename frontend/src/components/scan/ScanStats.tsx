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
    <div className="grid grid-cols-3 gap-4">
      <StatBox
        icon={<Users size={14} className="text-slate-400" />}
        label="Total invitados"
        value={stats.total}
        color="default"
      />
      <StatBox
        icon={<UserCheck size={14} className="text-emerald-500" />}
        label="Presentes"
        value={stats.present}
        color="green"
      />
      <StatBox
        icon={<Percent size={14} className="text-blue-500" />}
        label="Asistencia"
        value={`${stats.pct}%`}
        color="blue"
        sub={
          <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${stats.pct}%` }}
            />
          </div>
        }
      />
    </div>
  );
}

function StatBox({
  icon,
  label,
  value,
  color,
  sub,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  color: "default" | "green" | "blue";
  sub?: ReactNode;
}) {
  const valueColor =
    color === "green"
      ? "text-emerald-600"
      : color === "blue"
        ? "text-blue-600"
        : "text-slate-900";

  return (
    <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-[0_1px_3px_rgb(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p
        className={`text-[26px] font-semibold leading-none tracking-tight ${valueColor}`}
      >
        {value}
      </p>
      {sub}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 rounded-xl px-5 py-4"
        >
          <div className="h-2.5 w-24 bg-slate-100 rounded animate-pulse mb-3" />
          <div className="h-7   w-16 bg-slate-100 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}
