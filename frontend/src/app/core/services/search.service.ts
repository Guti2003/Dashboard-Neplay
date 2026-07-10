import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { SearchResults } from '../models/search.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly http = inject(HttpClient);

  search(term: string): Observable<SearchResults> {
    return this.http
      .get<ApiResponse<SearchResults>>(`${environment.apiUrl}/search`, { params: { q: term } })
      .pipe(map((response) => response.data));
  }
}
