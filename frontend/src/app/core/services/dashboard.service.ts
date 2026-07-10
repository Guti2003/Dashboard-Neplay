import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { DashboardStats } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);

  getStats(): Observable<DashboardStats> {
    return this.http
      .get<ApiResponse<DashboardStats>>(`${environment.apiUrl}/dashboard/stats`)
      .pipe(map((response) => response.data));
  }
}
