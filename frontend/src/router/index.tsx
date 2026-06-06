import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";
import AppLayout from "../components/layout/AppLayout";
import EventDetailPage from "../pages/EventDetailPage";
import DisplayPage from "../pages/DisplayPage";

const router = createBrowserRouter([
  /* ── Public ── */
  {
    path: "/login",
    element: <LoginPage />,
  },

  /* ── Display (TV) — ruta pública sin auth ── */
  {
    path: "/display/:id",
    element: <DisplayPage />,
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
      { path: "events/:id", element: <EventDetailPage /> },
    ],
  },

  /* ── Fallback ── */
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
