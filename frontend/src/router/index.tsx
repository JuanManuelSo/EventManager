import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/layout/ProtectedRoute";

// import DashboardPage      from '../pages/DashboardPage';
// import EventDetailPage    from '../pages/EventDetailPage';

const router = createBrowserRouter([
  /* ── Public ── */
  {
    path: "/login",
    element: <LoginPage />,
  },

  /* ── Protected ── */
  {
    path: "/",
    element: (
      <ProtectedRoute>
        {/* Replace with <DashboardPage /> when built */}
        <div className="min-h-screen flex items-center justify-center bg-brand-surface">
          <p className="text-slate-400 text-sm">Dashboard — próximamente</p>
        </div>
      </ProtectedRoute>
    ),
  },

  /* ── Fallback ── */
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
