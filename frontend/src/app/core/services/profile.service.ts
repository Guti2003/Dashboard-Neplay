import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { PaginatedResponse } from '../models/pagination.model';
import {
  CreateProfilesBatchPayload,
  ListProfilesParams,
  Profile,
  ProfileFormValue,
} from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);

  list(accountId: number, params: ListProfilesParams = {}): Observable<PaginatedResponse<Profile>> {
    return this.http.get<PaginatedResponse<Profile>>(
      `${environment.apiUrl}/accounts/${accountId}/profiles`,
      { params: this.buildParams(params) }
    );
  }

  create(accountId: number, payload: ProfileFormValue): Observable<Profile> {
    return this.http
      .post<ApiResponse<Profile>>(`${environment.apiUrl}/accounts/${accountId}/profiles`, payload)
      .pipe(map((response) => response.data));
  }

  createBatch(accountId: number, payload: CreateProfilesBatchPayload): Observable<Profile[]> {
    return this.http
      .post<ApiResponse<Profile[]>>(`${environment.apiUrl}/accounts/${accountId}/profiles/batch`, payload)
      .pipe(map((response) => response.data));
  }

  update(id: number, payload: ProfileFormValue): Observable<Profile> {
    return this.http
      .put<ApiResponse<Profile>>(`${environment.apiUrl}/profiles/${id}`, payload)
      .pipe(map((response) => response.data));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/profiles/${id}`);
  }

  renew(id: number): Observable<Profile> {
    return this.http
      .post<ApiResponse<Profile>>(`${environment.apiUrl}/profiles/${id}/renew`, {})
      .pipe(map((response) => response.data));
  }

  private buildParams(params: ListProfilesParams): HttpParams {
    let httpParams = new HttpParams();

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return httpParams;
  }
}
