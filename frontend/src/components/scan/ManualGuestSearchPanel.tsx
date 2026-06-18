import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import type { Guest } from "../../types";
import ManualCheckinConfirmModal from "./ManualCheckinConfirmModal";

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function ManualGuestSearchPanel({
  guests,
  isLoading,
  resetKey,
  onConfirmCheckin,
}: {
  guests: Guest[];
  isLoading: boolean;
  resetKey: number;
  onConfirmCheckin: (guest: Guest) => void;
}) {
  const [manualQ, setManualQ] = useState("");
  const [manualRes, setManualRes] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const manualInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setManualQ("");
    setManualRes([]);
    setSelectedGuest(null);
    setTimeout(() => manualInputRef.current?.focus(), 0);
  }, [resetKey]);

  function handleManualSearch(q: string) {
    setManualQ(q);
    if (!q.trim()) {
      setManualRes([]);
      return;
    }

    const search = normalizeSearchValue(q);
    setManualRes(
      guests
        .filter((g) => {
          const searchable = [
            g.nombre,
            g.apellido,
            `${g.nombre} ${g.apellido}`,
            `${g.apellido} ${g.nombre}`,
            g.email ?? "",
            g.documento ?? "",
            g.telefono ?? "",
            g.numero ?? "",
            g.mesa ?? "",
          ];

          return searchable.some((value) =>
            normalizeSearchValue(value).includes(search),
          );
        })
        .sort((a, b) => Number(a.checkedIn) - Number(b.checkedIn))
        .slice(0, 8),
    );
  }

  function handleCloseManualCheckin() {
    setSelectedGuest(null);
    manualInputRef.current?.focus();
  }

  function handleConfirm() {
    if (!selectedGuest) return;
    onConfirmCheckin(selectedGuest);
  }

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgb(0,0,0,0.05)]">
        <div className="px-5 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50 to-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Search size={15} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Check-in manual
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Fallback principal si falla el escaneo QR
              </p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              ref={manualInputRef}
              value={manualQ}
              onChange={(e) => handleManualSearch(e.target.value)}
              placeholder="Buscar por nombre, apellido, DNI, teléfono o mesa..."
              autoFocus
              className="w-full pl-10 pr-3 py-3 text-sm text-slate-900
                         bg-slate-50 border border-slate-200 rounded-xl
                         placeholder:text-slate-400
                         focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900
                         transition-colors duration-150"
            />
          </div>

          {manualRes.length > 0 && (
            <div className="mt-3 flex flex-col divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {manualRes.map((g) => (
                <div
                  key={g.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors duration-100 text-left"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <p className="text-sm font-semibold text-slate-800">
                      {g.nombre} {g.apellido}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600">
                        <span className="text-slate-400 font-medium">Mesa</span>
                        {g.mesa ?? "—"}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-50 text-[10px] font-semibold text-violet-700">
                        <span className="text-violet-400 font-medium">+</span>
                        {g.cant_acompanantes ?? 0} acompañante
                        {(g.cant_acompanantes ?? 0) !== 1 ? "s" : ""}
                      </span>
                      {/* DNI */}
                      {/* <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600">
                        <span className="text-slate-400 font-medium">DNI</span>
                        {g.documento || "—"}
                      </span> */}
                    </div>
                    {(g.email || g.telefono || g.numero) && (
                      <p className="text-[11px] text-slate-400 mt-1 truncate">
                        {g.email ?? g.telefono ?? g.numero}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {g.checkedIn ? (
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">
                        Ya registrado
                      </span>
                    ) : (
                      <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full">
                        Listo
                      </span>
                    )}
                    <button
                      onClick={() => setSelectedGuest(g)}
                      disabled={isLoading}
                      className="px-3 py-1.5 text-[11px] font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Revisar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!manualQ.trim() && (
            <div className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5">
              <p className="text-sm font-medium text-slate-600">
                Escribí datos del invitado para confirmar el check-in manual.
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Recomendado: apellido, documento, teléfono, número de invitación o mesa.
              </p>
            </div>
          )}

          {manualQ.trim() && manualRes.length === 0 && (
            <div className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center">
              <p className="text-xs font-medium text-slate-500">
                No encontramos invitados con esa búsqueda.
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Probá con apellido, documento, teléfono o mesa.
              </p>
            </div>
          )}
        </div>
      </div>

      <ManualCheckinConfirmModal
        guest={selectedGuest}
        isLoading={isLoading}
        onClose={handleCloseManualCheckin}
        onConfirm={handleConfirm}
      />
    </>
  );
}
