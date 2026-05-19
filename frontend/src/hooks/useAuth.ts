import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import type { LoginCredentials } from "../types";
import { useAuth } from "../store/AuthContext";

export function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Actualizar el estado global inmediatamente
      setUser(data.user);

      // Redirigir al área principal
      navigate("/");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  return { logout };
}
