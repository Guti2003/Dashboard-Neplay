import { AuthUser } from './user.model';

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  expiresIn: string;
}
