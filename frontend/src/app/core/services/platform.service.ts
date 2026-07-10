import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Platform } from '../models/platform.model';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private readonly http = inject(HttpClient);

  get(slug: string): Observable<Platform> {
    return this.http
      .get<ApiResponse<Platform>>(`${environment.apiUrl}/platforms/${slug}`)
      .pipe(map((response) => response.data));
  }

  updateLimit(slug: string, maxProfilesPerAccount: number | null): Observable<Platform> {
    return this.http
      .put<ApiResponse<Platform>>(`${environment.apiUrl}/platforms/${slug}`, { maxProfilesPerAccount })
      .pipe(map((response) => response.data));
  }
}
