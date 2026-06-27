import { Plus } from "lucide-react";

type NewEventCardProps = {
  onClick: () => void;
};

export default function NewEventCard({ onClick }: NewEventCardProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border-2 border-dashed border-slate-200 min-h-70
                 flex flex-col items-center justify-center gap-3
                 text-slate-400
                 hover:border-slate-300 hover:bg-slate-50/60 hover:text-slate-500
                 transition-all duration-200 focus:outline-none group cursor-pointer"
    >
      <div
        className="w-9 h-9 rounded-lg border border-dashed border-slate-300
                      flex items-center justify-center
                      group-hover:border-slate-400 transition-colors duration-200"
      >
        <Plus size={16} />
      </div>
      <div className="text-center">
        <p className="text-[13px] font-medium">Nuevo evento</p>
        <p className="text-[11px] text-slate-300 mt-0.5">
          Hacé clic para comenzar
        </p>
      </div>
    </button>
  );
}
