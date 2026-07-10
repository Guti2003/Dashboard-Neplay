import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { PaginatedResponse } from '../models/pagination.model';
import { Client, ClientFormValue, ListClientsParams } from '../models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly http = inject(HttpClient);

  list(params: ListClientsParams = {}): Observable<PaginatedResponse<Client>> {
    return this.http.get<PaginatedResponse<Client>>(`${environment.apiUrl}/clients`, {
      params: this.buildParams(params),
    });
  }

  get(id: number): Observable<Client> {
    return this.http
      .get<ApiResponse<Client>>(`${environment.apiUrl}/clients/${id}`)
      .pipe(map((response) => response.data));
  }

  create(payload: ClientFormValue): Observable<Client> {
    return this.http
      .post<ApiResponse<Client>>(`${environment.apiUrl}/clients`, payload)
      .pipe(map((response) => response.data));
  }

  update(id: number, payload: ClientFormValue): Observable<Client> {
    return this.http
      .put<ApiResponse<Client>>(`${environment.apiUrl}/clients/${id}`, payload)
      .pipe(map((response) => response.data));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/clients/${id}`);
  }

  private buildParams(params: ListClientsParams): HttpParams {
    let httpParams = new HttpParams();

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return httpParams;
  }
}
