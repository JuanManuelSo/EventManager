export function ensureQrJobCanStart(input: {
  eventExists: boolean;
  isProcessing: boolean;
  guestCount: number;
}) {
  if (!input.eventExists) {
    const error = new Error("Evento no encontrado") as Error & { statusCode?: number };
    error.statusCode = 404;
    throw error;
  }

  if (input.isProcessing) {
    const error = new Error("Ya hay una generación de QR en progreso") as Error & {
      statusCode?: number;
    };
    error.statusCode = 409;
    throw error;
  }

  if (input.guestCount === 0) {
    const error = new Error("El evento no tiene invitados para generar QRs") as Error & {
      statusCode?: number;
    };
    error.statusCode = 400;
    throw error;
  }
}
