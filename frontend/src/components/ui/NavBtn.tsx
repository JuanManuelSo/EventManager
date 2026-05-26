export function NavBtn({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1.5
                 text-xs font-medium text-slate-500
                 border border-slate-200 rounded
                 hover:bg-slate-50 hover:text-slate-700
                 transition-colors duration-150 focus:outline-none
                 cursor-pointer"
    >
      {icon}
      {children}
    </button>
  );
}
