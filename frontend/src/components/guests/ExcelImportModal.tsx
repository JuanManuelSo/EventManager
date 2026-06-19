import { memo, useState, useRef, useCallback } from "react";
import {
  X,
  Upload,
  FileSpreadsheet,
  AlertCircle,
  ChevronDown,
  Trash2,
} from "lucide-react";
import * as XLSX from "xlsx";
import Button from "../ui/Button";
import { useScrollLock } from "../../hooks/MyHooks/useScrollLock";
import {
  parseGuestSheet,
  type GuestImportRow,
  type RowError,
} from "../../lib/guestImport";

/* ── Props ── */
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rows: GuestImportRow[]) => void;
  isLoading?: boolean;
}

type Step = "upload" | "preview";

const ExcelImportModal = memo(function ExcelImportModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: Props) {
  const [step, setStep] = useState<Step>("upload");
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<GuestImportRow[]>([]);
  const [errors, setErrors] = useState<RowError[]>([]);
  const [showErr, setShowErr] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStep("upload");
    setFile(null);
    setRows([]);
    setErrors([]);
    setShowErr(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const processFile = useCallback((f: File) => {
    console.log("1. processFile llamado", f.name, f.type, f.size);

    if (!f.name.match(/\.(xlsx|xls|csv)$/i)) {
      return;
    }
    setFile(f);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });

        const { rows: r, errors: errs } = parseGuestSheet(wb);

        setRows(r);
        setErrors(errs);
        setStep("preview");
      } catch (err) {
        console.error("ERROR en onload:", err);
      }
    };

    reader.onerror = (err) => {
      console.error("ERROR FileReader:", err);
    };

    reader.readAsArrayBuffer(f);
  }, []);

  /* ── Drag handlers ── */
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
    e.target.value = "";
  };

  useScrollLock(isOpen);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm "
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* ── Header ── */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-900">
              {step === "upload" ? "Importar invitados" : "Vista previa"}
            </h2>
            <p className="text-[12px] text-slate-400 mt-0.5">
              {step === "upload"
                ? "Subí un archivo Excel (.xlsx) o CSV con los datos"
                : `${rows.length} invitados listos para importar`}
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-1.5 rounded text-slate-400  hover:text-slate-600
                       disabled:opacity-40 transition-colors focus:outline-none cursor-pointer "
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* ────── STEP: UPLOAD ────── */}
          {step === "upload" && (
            <div className="flex flex-col gap-5">
              {/* Drop zone */}
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={[
                  "relative flex flex-col items-center justify-center gap-3",
                  "h-44 rounded-xl border-2 border-dashed cursor-pointer",
                  "transition-all duration-200",
                  dragging ? "border-blue-400 bg-blue-50" : "border-slate-200 ",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-11 h-11 rounded-xl flex items-center justify-center transition-colors",
                    dragging ? "bg-blue-100" : "bg-slate-100",
                  ].join(" ")}
                >
                  <Upload
                    size={20}
                    className={dragging ? "text-blue-500" : "text-slate-400"}
                  />
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-medium text-slate-700">
                    {dragging
                      ? "Soltá el archivo aquí"
                      : "Arrastrá tu archivo o hacé clic"}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Soporta .xlsx, .xls y .csv
                  </p>
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Template hint */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 ">
                <p className="text-[12px] font-semibold text-slate-700 mb-2 ">
                  Columnas reconocidas
                </p>
                <div className="flex flex-wrap gap-1.5 ">
                  {[
                    { col: "documento", req: true },
                    { col: "nombre", req: true },
                    { col: "apellido", req: true },
                    { col: "email", req: false },
                    { col: "numero", req: false },
                    { col: "mesa", req: false },
                    { col: "cant_acompanantes", req: false },
                  ].map(({ col, req }) => (
                    <span
                      key={col}
                      className={[
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium",
                        req
                          ? "bg-slate-200 text-slate-700"
                          : "bg-white border border-slate-200 text-slate-500",
                      ].join(" ")}
                    >
                      {col}
                      {req && <span className="text-red-400">*</span>}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  * Requeridos. Los nombres de columna no son sensibles a
                  mayúsculas.
                </p>
              </div>
            </div>
          )}

          {/* ────── STEP: PREVIEW ────── */}
          {step === "preview" && (
            <div className="flex flex-col gap-4">
              {/* File info bar */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
                <FileSpreadsheet
                  size={16}
                  className="text-emerald-600 shrink-0"
                />
                <span className="text-[12px] font-medium text-slate-700 flex-1 truncate">
                  {file?.name}
                </span>
                <button
                  onClick={reset}
                  className="cursor-pointer p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors "
                  title="Cambiar archivo"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <StatPill
                  value={rows.length}
                  label="Listos para importar"
                  color="green"
                />
                <StatPill
                  value={errors.length}
                  label="Filas con error"
                  color={errors.length > 0 ? "red" : "neutral"}
                />
                <StatPill
                  value={rows.length + errors.length}
                  label="Total en archivo"
                  color="neutral"
                />
              </div>

              {/* Errors accordion */}
              {errors.length > 0 && (
                <div className="border border-red-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowErr((v) => !v)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 bg-red-50 text-left"
                  >
                    <AlertCircle size={14} className="text-red-500 shrink-0" />
                    <span className="text-[12px] font-medium text-red-700 flex-1">
                      {errors.length} fila{errors.length > 1 ? "s" : ""} con
                      datos faltantes (serán omitidas)
                    </span>
                    <ChevronDown
                      size={13}
                      className={`text-red-400 transition-transform ${showErr ? "rotate-180" : ""}`}
                    />
                  </button>
                  {showErr && (
                    <div className="divide-y divide-red-100 max-h-32 overflow-y-auto">
                      {errors.map((err, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 px-4 py-2 bg-white"
                        >
                          <span className="text-[10px] font-semibold text-red-400 w-12 shrink-0">
                            Fila {err.row}
                          </span>
                          <span className="text-[11px] text-slate-600">
                            {err.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Preview table */}
              {rows.length > 0 && (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto max-h-56">
                    <table className="w-full text-[11px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          {[
                            "Documento",
                            "Apellido",
                            "Nombre",
                            "Email",
                            "Mesa",
                            "Acomp.",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-3 py-2 text-left font-semibold text-slate-500 whitespace-nowrap"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.slice(0, 50).map((r, i) => (
                          <tr
                            key={i}
                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                          >
                            <td className="px-3 py-2 text-slate-700 font-medium">
                              {r.documento}
                            </td>
                            <td className="px-3 py-2 text-slate-700">
                              {r.apellido}
                            </td>
                            <td className="px-3 py-2 text-slate-700">
                              {r.nombre}
                            </td>
                            <td className="px-3 py-2 text-slate-500">
                              {r.email ?? "—"}
                            </td>
                            <td className="px-3 py-2 text-slate-500">
                              {r.mesa ?? "—"}
                            </td>
                            <td className="px-3 py-2 text-slate-500 text-center">
                              {r.cant_acompanantes ?? "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {rows.length > 50 && (
                    <div className="px-3 py-2 bg-slate-50 border-t border-slate-200">
                      <p className="text-[10px] text-slate-400 text-center">
                        Mostrando 50 de {rows.length} filas
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-2 shrink-0">
          {step === "upload" ? (
            <Button
              variant="secondary"
              onClick={handleClose}
              fullWidth
              size="md"
            >
              Cancelar
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={reset} size="md" fullWidth>
                Volver
              </Button>
              <Button
                variant="primary"
                onClick={() => onConfirm(rows)}
                loading={isLoading}
                disabled={rows.length === 0}
                size="md"
                fullWidth
              >
                {isLoading
                  ? "Importando..."
                  : `Importar ${rows.length} invitado${rows.length !== 1 ? "s" : ""}`}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default ExcelImportModal;

/* ── StatPill ── */
function StatPill({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: "green" | "red" | "neutral";
}) {
  const colors = {
    green: "bg-emerald-50 border-emerald-100 text-emerald-700",
    red:
      value > 0
        ? "bg-red-50 border-red-100 text-red-600"
        : "bg-slate-50 border-slate-200 text-slate-500",
    neutral: "bg-slate-50 border-slate-200 text-slate-600",
  };
  return (
    <div
      className={`border rounded-lg px-3 py-2.5 text-center ${colors[color]}`}
    >
      <p className="text-[20px] font-semibold leading-none">{value}</p>
      <p className="text-[10px] mt-1 leading-tight">{label}</p>
    </div>
  );
}
