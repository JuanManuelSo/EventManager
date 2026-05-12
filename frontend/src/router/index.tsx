import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";
import AppLayout from "../components/layout/AppLayout";

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
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      // { path: 'events/:id', element: <EventDetailPage /> }, ← próximo
    ],
  },

  /* ── Fallback ── */
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
