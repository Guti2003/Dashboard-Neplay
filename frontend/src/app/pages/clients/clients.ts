import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../core/services/client.service';
import { ToastService } from '../../core/services/toast.service';
import { Client, ClientFormValue } from '../../core/models/client.model';
import { PaginationMeta } from '../../core/models/pagination.model';
import { ClientCard } from './client-card/client-card';
import { ClientFormModal } from './client-form-modal/client-form-modal';
import { ClientDetailModal } from './client-detail-modal/client-detail-modal';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';

type SortBy = 'name' | 'phone' | 'createdAt';
type SortDir = 'asc' | 'desc';

const PER_PAGE = 9;

@Component({
  selector: 'app-clients',
  imports: [ClientCard, ClientFormModal, ClientDetailModal, ConfirmDialog],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {
  private readonly clientService = inject(ClientService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly openClient = input<string>();

  readonly clients = signal<Client[]>([]);
  readonly meta = signal<PaginationMeta | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly search = signal('');
  readonly sortBy = signal<SortBy>('createdAt');
  readonly sortDir = signal<SortDir>('desc');
  readonly page = signal(1);

  readonly formModalOpen = signal(false);
  readonly editingClient = signal<Client | null>(null);
  readonly saving = signal(false);
  readonly formError = signal<string | null>(null);

  readonly deleteTarget = signal<Client | null>(null);
  readonly deleting = signal(false);

  readonly detailClient = signal<Client | null>(null);

  private searchDebounce?: ReturnType<typeof setTimeout>;

  constructor() {
    this.loadClients();

    effect(() => {
      const clientId = this.openClient();
      if (!clientId) return;

      this.clientService.get(Number(clientId)).subscribe({
        next: (client) => {
          this.detailClient.set(client);
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {},
            replaceUrl: true,
          });
        },
        error: () => {
          this.toastService.error('No se pudo abrir el cliente indicado.');
        },
      });
    });
  }

  loadClients(): void {
    this.loading.set(true);
    this.error.set(null);

    this.clientService
      .list({
        search: this.search() || undefined,
        sortBy: this.sortBy(),
        sortDir: this.sortDir(),
        page: this.page(),
        perPage: PER_PAGE,
      })
      .subscribe({
        next: ({ data, metadata }) => {
          this.clients.set(data);
          this.meta.set(metadata);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar los clientes. Intenta de nuevo.');
          this.loading.set(false);
        },
      });
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => {
      this.page.set(1);
      this.loadClients();
    }, 350);
  }

  onSortByChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.sortBy.set(value as SortBy);
    this.loadClients();
  }

  toggleSortDir(): void {
    this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    this.loadClients();
  }

  goToPage(target: number): void {
    const lastPage = this.meta()?.lastPage ?? 1;
    if (target < 1 || target > lastPage) return;
    this.page.set(target);
    this.loadClients();
  }

  openCreateModal(): void {
    this.editingClient.set(null);
    this.formError.set(null);
    this.formModalOpen.set(true);
  }

  openDetail(client: Client): void {
    this.detailClient.set(client);
  }

  closeDetail(): void {
    this.detailClient.set(null);
  }

  openEditModal(client: Client): void {
    this.editingClient.set(client);
    this.formError.set(null);
    this.formModalOpen.set(true);
  }

  closeFormModal(): void {
    this.formModalOpen.set(false);
  }

  saveClient(value: ClientFormValue): void {
    this.saving.set(true);
    this.formError.set(null);

    const editing = this.editingClient();
    const request = editing
      ? this.clientService.update(editing.id, value)
      : this.clientService.create(value);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.formModalOpen.set(false);
        this.loadClients();
        this.toastService.success(editing ? 'Cliente actualizado correctamente.' : 'Cliente creado correctamente.');
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.formError.set(this.resolveErrorMessage(error));
      },
    });
  }

  confirmDelete(client: Client): void {
    this.deleteTarget.set(client);
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  performDelete(): void {
    const target = this.deleteTarget();
    if (!target) return;

    this.deleting.set(true);

    this.clientService.delete(target.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.deleteTarget.set(null);
        this.loadClients();
        this.toastService.success('Cliente eliminado correctamente.');
      },
      error: (error: HttpErrorResponse) => {
        this.deleting.set(false);
        this.deleteTarget.set(null);
        this.toastService.error(error.error?.message ?? 'No se pudo eliminar el cliente.');
      },
    });
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    const firstError = error.error?.errors?.[0]?.message ?? error.error?.message;
    return firstError ?? 'No se pudo guardar el cliente.';
  }
}
