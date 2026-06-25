import type { AuthResponse, LoginCredentials } from "../types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { default: api } = await import("../lib/api");

      console.log("[authService.login] llamando a POST /api/users/login");

      const response = await api.post("/users/login", credentials);

      console.log(
        "[authService.login] respuesta cruda del backend:",
        response.data,
      );

      // Backend responde: { status: 'success', data: { user, accessToken } }
      // axios pone el body en response.data
      // entonces response.data.data tiene { user, accessToken }
      const { user, accessToken } = response.data.data;

      console.log("[authService.login] user extraído:", user);
      console.log(
        "[authService.login] token:",
        accessToken ? "recibido OK" : "FALTA TOKEN",
      );

      return { user, accessToken };
    } catch (error: any) {
      console.error("[authService.login] ERROR:", {
        httpStatus: error?.response?.status,
        message: error?.response?.data?.message ?? error?.message,
        fullData: error?.response?.data,
      });
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
};
