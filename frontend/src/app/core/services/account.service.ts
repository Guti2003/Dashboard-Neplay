import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { PaginatedResponse } from '../models/pagination.model';
import { Account, AccountFormValue, ListAccountsParams } from '../models/account.model';

/**
 * One reusable service for accounts, scoped by platform slug on list/create
 * and by account id on update/delete — no per-platform duplication.
 */
@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly http = inject(HttpClient);

  list(platformSlug: string, params: ListAccountsParams = {}): Observable<PaginatedResponse<Account>> {
    return this.http.get<PaginatedResponse<Account>>(
      `${environment.apiUrl}/platforms/${platformSlug}/accounts`,
      { params: this.buildParams(params) }
    );
  }

  create(platformSlug: string, payload: AccountFormValue): Observable<Account> {
    return this.http
      .post<ApiResponse<Account>>(`${environment.apiUrl}/platforms/${platformSlug}/accounts`, payload)
      .pipe(map((response) => response.data));
  }

  update(id: number, payload: AccountFormValue): Observable<Account> {
    return this.http
      .put<ApiResponse<Account>>(`${environment.apiUrl}/accounts/${id}`, payload)
      .pipe(map((response) => response.data));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/accounts/${id}`);
  }

  private buildParams(params: ListAccountsParams): HttpParams {
    let httpParams = new HttpParams();

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return httpParams;
  }
}
