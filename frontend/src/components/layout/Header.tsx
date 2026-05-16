import { useNavigate } from "react-router-dom";
import { Calendar, LogOut } from "lucide-react";
import { useAuth } from "../../store/AuthContext";

export default function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="h-13 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2.5 select-none focus:outline-none group"
      >
        <div className="w-6.5 h-6.5 bg-slate-900 rounded flex items-center justify-center shrink-0">
          <GridIcon />
        </div>
        <span className="text-[13px] font-semibold text-slate-900 tracking-tight group-hover:text-slate-700 transition-colors">
          Event Manager
        </span>
      </button>

      {/* Right */}
      <div className="flex items-center gap-2">
        <NavBtn
          onClick={() => navigate("/calendario")}
          icon={<Calendar size={13} />}
        >
          Calendario
        </NavBtn>

        <div className="w-px h-4 bg-slate-200 mx-0.5" />

        <LogOutBtn onClick={handleLogout} icon={<LogOut size={13} />}>
          Salir
        </LogOutBtn>
      </div>
    </header>
  );
}

function NavBtn({
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
                 transition-colors duration-150 focus:outline-none"
    >
      {icon}
      {children}
    </button>
  );
}

function LogOutBtn({
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
                 transition-colors duration-150 focus:outline-none"
    >
      {icon}
      {children}
    </button>
  );
}

function GridIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="white" />
      <rect
        x="7.5"
        y="1"
        width="4.5"
        height="4.5"
        rx="1"
        fill="white"
        opacity=".4"
      />
      <rect
        x="1"
        y="7.5"
        width="4.5"
        height="4.5"
        rx="1"
        fill="white"
        opacity=".4"
      />
      <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill="white" />
    </svg>
  );
}
