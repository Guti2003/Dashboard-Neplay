import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, inject, input, output, signal } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';

/**
 * Search-or-create client picker. Presentational: the parent owns which
 * client is currently selected and reacts to `select` (null = cleared).
 */
@Component({
  selector: 'app-client-picker',
  templateUrl: './client-picker.html',
  styleUrl: './client-picker.css',
})
export class ClientPicker {
  private readonly clientService = inject(ClientService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly selected = input<Client | null>(null);
  readonly select = output<Client | null>();

  readonly searchTerm = signal('');
  readonly results = signal<Client[]>([]);
  readonly searching = signal(false);
  readonly dropdownOpen = signal(false);

  readonly createOpen = signal(false);
  readonly newName = signal('');
  readonly newPhone = signal('');
  readonly creating = signal(false);
  readonly createError = signal<string | null>(null);

  private searchDebounce?: ReturnType<typeof setTimeout>;

  onFocus(): void {
    this.dropdownOpen.set(true);
    if (this.results().length === 0) {
      this.runSearch();
    }
    // Let the dropdown render, then make sure it's fully visible instead of
    // being clipped by the modal's scroll container.
    setTimeout(() => {
      const dropdown = this.elementRef.nativeElement.querySelector('.client-dropdown');
      dropdown?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 50);
  }

  onBlur(): void {
    // Let a click on a dropdown item register before the dropdown disappears.
    setTimeout(() => this.dropdownOpen.set(false), 150);
  }

  onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => this.runSearch(), 300);
  }

  private runSearch(): void {
    this.searching.set(true);
    this.clientService.list({ search: this.searchTerm() || undefined, perPage: 6 }).subscribe({
      next: ({ data }) => {
        this.results.set(data);
        this.searching.set(false);
      },
      error: () => {
        this.searching.set(false);
      },
    });
  }

  pick(client: Client): void {
    this.select.emit(client);
    this.dropdownOpen.set(false);
    this.searchTerm.set('');
  }

  clear(): void {
    this.select.emit(null);
  }

  openCreate(): void {
    this.newName.set(this.searchTerm());
    this.newPhone.set('');
    this.createError.set(null);
    this.createOpen.set(true);
    this.dropdownOpen.set(false);
  }

  closeCreate(): void {
    this.createOpen.set(false);
  }

  submitCreate(): void {
    const name = this.newName().trim();
    const phone = this.newPhone().trim();

    if (!name || !phone) {
      this.createError.set('Nombre y celular son obligatorios.');
      return;
    }

    this.creating.set(true);
    this.createError.set(null);

    this.clientService.create({ name, phone }).subscribe({
      next: (client) => {
        this.creating.set(false);
        this.createOpen.set(false);
        this.select.emit(client);
      },
      error: (error: HttpErrorResponse) => {
        this.creating.set(false);
        const firstError = error.error?.errors?.[0]?.message;
        this.createError.set(firstError ?? 'No se pudo crear el cliente.');
      },
    });
  }
}
