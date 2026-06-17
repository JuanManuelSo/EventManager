export default function Th({
  children,
  align,
}: {
  children?: React.ReactNode;
  align?: "right";
}) {
  return (
    <th
      className={`px-3 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-left ${align === "right" ? "text-right" : ""}`}
    >
      {children}
    </th>
  );
}
