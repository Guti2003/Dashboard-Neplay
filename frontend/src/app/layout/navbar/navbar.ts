import { Component, computed, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SearchService } from '../../core/services/search.service';
import { SearchAccountResult, SearchClientResult, SearchProfileResult, SearchResults } from '../../core/models/search.model';
import { GlassShineDirective } from '../../shared/directives/glass-shine.directive';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, GlassShineDirective],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly authService = inject(AuthService);
  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);

  readonly menuToggle = output<void>();

  readonly currentUser = this.authService.currentUser;

  readonly today = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  searchTerm = '';
  readonly results = signal<SearchResults | null>(null);
  readonly searching = signal(false);
  readonly dropdownOpen = signal(false);

  readonly hasResults = computed(() => {
    const results = this.results();
    return !!results && (results.accounts.length > 0 || results.profiles.length > 0 || results.clients.length > 0);
  });

  private searchDebounce?: ReturnType<typeof setTimeout>;

  onSearchInput(value: string): void {
    this.searchTerm = value;
    clearTimeout(this.searchDebounce);

    const term = value.trim();
    if (!term) {
      this.results.set(null);
      this.dropdownOpen.set(false);
      return;
    }

    this.searchDebounce = setTimeout(() => this.runSearch(term), 300);
  }

  onFocus(): void {
    if (this.searchTerm.trim() && this.results()) {
      this.dropdownOpen.set(true);
    }
  }

  onBlur(): void {
    // Let a click on a dropdown item register before the dropdown disappears.
    setTimeout(() => this.dropdownOpen.set(false), 150);
  }

  private runSearch(term: string): void {
    this.searching.set(true);
    this.searchService.search(term).subscribe({
      next: (results) => {
        this.results.set(results);
        this.dropdownOpen.set(true);
        this.searching.set(false);
      },
      error: () => {
        this.searching.set(false);
      },
    });
  }

  goToAccount(result: SearchAccountResult): void {
    this.router.navigate(['/', result.platform.slug], { queryParams: { openAccount: result.id } });
    this.closeAndClear();
  }

  goToProfile(result: SearchProfileResult): void {
    this.router.navigate(['/', result.platform.slug], { queryParams: { openAccount: result.accountId } });
    this.closeAndClear();
  }

  goToClient(result: SearchClientResult): void {
    this.router.navigate(['/clients'], { queryParams: { openClient: result.id } });
    this.closeAndClear();
  }

  private closeAndClear(): void {
    this.dropdownOpen.set(false);
    this.searchTerm = '';
    this.results.set(null);
  }
}
