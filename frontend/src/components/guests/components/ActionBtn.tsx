export default function ActionBtn({
  icon,
  label,
  primary,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={[
        "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors duration-150 focus:outline-none cursor-pointer",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        primary
          ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
      ].join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  );
}
