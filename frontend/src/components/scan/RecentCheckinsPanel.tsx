import { UserCheck } from "lucide-react";

export interface RecentCheckinEntry {
  id: number;
  name: string;
  numero: string;
  table: string;
  cantAcompanantes: number | null;
  time: string;
  duplicate: boolean;
}

export default function RecentCheckinsPanel({
  recent,
}: {
  recent: RecentCheckinEntry[];
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgb(0,0,0,0.05)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h3 className="text-[13px] font-semibold text-slate-800">
          Últimos check-ins
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-emerald-600 font-medium">
            En vivo
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
              <UserCheck size={18} className="text-slate-400" />
            </div>
            <p className="text-xs text-slate-400">
              Los check-ins aparecerán aquí en tiempo real.
            </p>
          </div>
        ) : (
          recent.map((entry, i) => (
            <div
              key={`${entry.id}-${i}`}
              className={[
                "relative flex items-start gap-3 px-4 py-4",
                i === 0 ? "bg-linear-to-r from-emerald-50/60 to-transparent" : "",
                entry.duplicate ? "opacity-60" : "",
              ].join(" ")}
            >
              {i === 0 && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-400" />
              )}

              <div
                className={[
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[11px] font-bold shadow-sm",
                  entry.duplicate
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700",
                ].join(" ")}
              >
                {entry.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate leading-tight">
                  {entry.name}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{entry.time}</p>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600">
                    <span className="text-slate-400 font-medium">Mesa</span>
                    {entry.table}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600">
                    <span className="text-slate-400 font-medium">ID</span>
                    {entry.id}
                  </span>

                  {entry.cantAcompanantes !== null && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-50 text-[10px] font-semibold text-violet-700">
                      <span className="text-violet-400 font-medium">+</span>
                      {entry.cantAcompanantes} acompañante
                      {entry.cantAcompanantes !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 mt-0.5">
                {entry.duplicate ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-[9px] font-bold text-amber-600 border border-amber-200/60 whitespace-nowrap">
                    <span className="w-1 h-1 rounded-full bg-amber-400" />
                    DUPLICADO
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[9px] font-bold text-emerald-600 border border-emerald-200/60 whitespace-nowrap">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    CHECK-IN
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
