interface Props {
  label: string;
  value: string | number;
  sub?: string;
}

export default function StatCard({ label, value, sub }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-5 py-4">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="text-[28px] font-semibold text-slate-900 leading-none tracking-tight">
        {value}
      </p>
      {sub && <p className="text-[11px] text-slate-400 mt-1.5">{sub}</p>}
    </div>
  );
}
