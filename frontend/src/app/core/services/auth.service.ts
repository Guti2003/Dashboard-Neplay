import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AuthResponse, LoginPayload } from '../models/auth.model';
import { AuthUser } from '../models/user.model';

const TOKEN_KEY = 'netplay_token';
const USER_KEY = 'netplay_user';

/**
 * Owns the JWT session: persists it to localStorage when "remember me" is
 * checked, sessionStorage otherwise (cleared when the browser tab closes).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSignal = signal<AuthUser | null>(this.readStoredUser());

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${environment.apiUrl}/auth/login`, payload)
      .pipe(
        map((response) => response.data),
        tap((data) => this.persistSession(data, payload.rememberMe ?? false))
      );
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/account/logout`, {}).subscribe();
    this.clearSession();
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
  }

  private persistSession(data: AuthResponse, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    const otherStorage = rememberMe ? sessionStorage : localStorage;

    otherStorage.removeItem(TOKEN_KEY);
    otherStorage.removeItem(USER_KEY);
    storage.setItem(TOKEN_KEY, data.token);
    storage.setItem(USER_KEY, JSON.stringify(data.user));

    this.currentUserSignal.set(data.user);
  }

  private clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    this.currentUserSignal.set(null);
  }

  private readStoredUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
