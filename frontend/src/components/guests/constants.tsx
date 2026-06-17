import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { Guest } from "../../types";

export const PAGE_SIZE = 10;

export const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
export const SOCKET_URL = API_BASE.replace(/\/api\/?$/, "");

export type StatusFilter = "all" | Guest["status"];

export const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "Presente", label: "Presentes" },
  { key: "Pendiente", label: "Pendientes" },
  { key: "Ausente", label: "Ausentes" },
];

export const STATUS_CONFIG: Record<
  Guest["status"],
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  Presente: {
    label: "Presente",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    icon: <CheckCircle2 size={11} />,
  },
  Pendiente: {
    label: "Pendiente",
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: <Clock size={11} />,
  },
  Ausente: {
    label: "Ausente",
    bg: "bg-red-50",
    text: "text-red-600",
    icon: <XCircle size={11} />,
  },
};
