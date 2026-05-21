export function formatDate(value: string | Date): string {
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—"; // guard contra invalid date
  return (
    d.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    " · " +
    d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }) +
    " hs"
  );
}

export function formatDateForInput(value: string | Date): string {
  const d = new Date(value);

  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();

  const month = String(d.getMonth() + 1).padStart(2, "0");

  const day = String(d.getDate()).padStart(2, "0");

  const hours = String(d.getHours()).padStart(2, "0");

  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
