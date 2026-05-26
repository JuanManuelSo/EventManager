import * as XLSX from "xlsx";

/* ── Parsed guest row ── */
export interface GuestImportRow {
  documento: string;
  nombre: string;
  apellido: string;
  email?: string;
  numero?: string;
  mesa?: string;
  status?: string;
  cant_acompanantes?: number;
}

/* ── Validation error ── */
export interface RowError {
  row: number;
  field: string;
  message: string;
}

/* ── Required columns ── */
const REQUIRED_COLS = ["documento", "nombre", "apellido"] as const;

/* ── Column aliases ── */
const COL_ALIASES: Record<string, keyof GuestImportRow> = {
  documento: "documento",
  dni: "documento",
  "n° doc": "documento",

  nombre: "nombre",
  "nombre(s)": "nombre",

  apellido: "apellido",
  "apellido(s)": "apellido",

  email: "email",
  correo: "email",
  "e-mail": "email",

  telefono: "numero",
  teléfono: "numero",
  numero: "numero",
  celular: "numero",

  mesa: "mesa",
  "n° mesa": "mesa",

  acompanantes: "cant_acompanantes",
  acompañantes: "cant_acompanantes",
  cant_acompanantes: "cant_acompanantes",
};

/* ── Parse excel sheet ── */
export function parseGuestSheet(wb: XLSX.WorkBook): {
  rows: GuestImportRow[];
  errors: RowError[];
} {
  const ws = wb.Sheets[wb.SheetNames[0]];

  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
    defval: "",
    raw: false,
  });

  const rows: GuestImportRow[] = [];
  const errors: RowError[] = [];

  raw.forEach((rawRow, i) => {
    const rowNum = i + 2;

    const mapped: Partial<GuestImportRow> = {};

    /* ── Normalize columns ── */
    for (const [key, val] of Object.entries(rawRow)) {
      const normalized = key.trim().toLowerCase();

      const field = COL_ALIASES[normalized];

      if (!field) continue;

      if (field === "cant_acompanantes") {
        mapped[field] = val ? parseInt(String(val), 10) : undefined;
      } else {
        (mapped as any)[field] = String(val).trim();
      }
    }

    /* ── Required validation ── */
    for (const req of REQUIRED_COLS) {
      if (!mapped[req]) {
        errors.push({
          row: rowNum,
          field: req,
          message: `"${req}" es requerido`,
        });
      }
    }

    /* ── Only valid rows ── */
    if (mapped.documento && mapped.nombre && mapped.apellido) {
      rows.push(mapped as GuestImportRow);
    }
  });

  return { rows, errors };
}
