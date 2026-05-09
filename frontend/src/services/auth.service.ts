import type { AuthResponse, LoginCredentials } from '../types';
import { MOCK_USER, VALID_CREDENTIALS } from '../mocks/data';
import { sleep } from '../lib/utils';

const USE_MOCK = true; // Toggle to false when backend is ready

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK) {
      await sleep(800);
      const valid = VALID_CREDENTIALS.find(
        (c) => c.email === credentials.email && c.password === credentials.password
      );
      if (!valid) {
        throw new Error('Credenciales inválidas');
      }
      return { user: MOCK_USER, accessToken: 'mock-token-abc123' };
    }

    const { default: api } = await import('../lib/api');
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
};
