export function LogOutBtn({
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
                 text-xs font-medium text-rose-500
                 border border-rose-200 rounded
                 hover:bg-rose-50 hover:text-rose-700
                 transition-colors duration-150 focus:outline-none
                 cursor-pointer"
    >
      {icon}
      {children}
    </button>
  );
}
