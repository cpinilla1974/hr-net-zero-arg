import { apiClient } from "./client";
import { UserRole } from "@/contexts/AuthContext";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  email: string;
  nombre: string;
  rol: UserRole;
  pais?: string;
  empresa_id?: number;
  activo: boolean;
}

export const authAPI = {
  async login(credentials: LoginRequest): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>(
      "/auth/login",
      credentials
    );

    if (response.access_token) {
      apiClient.setToken(response.access_token);
    }

    return response;
  },

  async getCurrentUser(): Promise<UserResponse> {
    return apiClient.get<UserResponse>("/auth/me");
  },

  logout() {
    apiClient.setToken(null);
  },
};
