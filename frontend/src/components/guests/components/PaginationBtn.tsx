export default function PaginationBtn({
  onClick,
  disabled,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none"
    >
      {icon}
    </button>
  );
}
