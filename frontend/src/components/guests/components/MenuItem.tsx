export default function MenuItem({
  label,
  danger,
  onClick,
}: {
  label: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full text-left px-3 py-2 text-xs font-medium transition-colors duration-100 cursor-pointer",
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
