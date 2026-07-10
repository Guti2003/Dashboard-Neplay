import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, input, signal } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { ToastService } from '../../core/services/toast.service';
import { Account, AccountFormValue, AccountStatus } from '../../core/models/account.model';
import { PaginationMeta } from '../../core/models/pagination.model';
import { AccountCard } from './account-card/account-card';
import { AccountFormModal } from './account-form-modal/account-form-modal';
import { ProfilesModal } from './profiles-modal/profiles-modal';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { GlassShineDirective } from '../../shared/directives/glass-shine.directive';

type SortBy = 'email' | 'status' | 'createdAt';
type SortDir = 'asc' | 'desc';

const PER_PAGE = 9;

/**
 * One component, driven by route `data`, reused for every platform
 * (Netflix, Disney+, Amazon Prime): the reusable accounts CRUD.
 */
@Component({
  selector: 'app-platform-accounts',
  imports: [AccountCard, AccountFormModal, ProfilesModal, ConfirmDialog, GlassShineDirective],
  templateUrl: './platform-accounts.html',
  styleUrl: './platform-accounts.css',
})
export class PlatformAccounts {
  private readonly accountService = inject(AccountService);
  private readonly toastService = inject(ToastService);

  readonly slug = input.required<string>();
  readonly platformName = input.required<string>();
  readonly colorVar = input.required<string>();

  readonly accounts = signal<Account[]>([]);
  readonly meta = signal<PaginationMeta | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly search = signal('');
  readonly statusFilter = signal<AccountStatus | ''>('');
  readonly sortBy = signal<SortBy>('createdAt');
  readonly sortDir = signal<SortDir>('desc');
  readonly page = signal(1);

  readonly formModalOpen = signal(false);
  readonly editingAccount = signal<Account | null>(null);
  readonly saving = signal(false);
  readonly formError = signal<string | null>(null);

  readonly deleteTarget = signal<Account | null>(null);
  readonly deleting = signal(false);

  readonly profilesAccount = signal<Account | null>(null);

  private searchDebounce?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      // Re-fetch whenever we navigate between platforms (slug changes).
      this.slug();
      this.page.set(1);
      this.loadAccounts();
    });
  }

  loadAccounts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.accountService
      .list(this.slug(), {
        search: this.search() || undefined,
        status: this.statusFilter() || undefined,
        sortBy: this.sortBy(),
        sortDir: this.sortDir(),
        page: this.page(),
        perPage: PER_PAGE,
      })
      .subscribe({
        next: ({ data, metadata }) => {
          this.accounts.set(data);
          this.meta.set(metadata);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar las cuentas. Intenta de nuevo.');
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
      this.loadAccounts();
    }, 350);
  }

  onStatusFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.statusFilter.set(value as AccountStatus | '');
    this.page.set(1);
    this.loadAccounts();
  }

  onSortByChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.sortBy.set(value as SortBy);
    this.loadAccounts();
  }

  toggleSortDir(): void {
    this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    this.loadAccounts();
  }

  goToPage(target: number): void {
    const lastPage = this.meta()?.lastPage ?? 1;
    if (target < 1 || target > lastPage) return;
    this.page.set(target);
    this.loadAccounts();
  }

  openCreateModal(): void {
    this.editingAccount.set(null);
    this.formError.set(null);
    this.formModalOpen.set(true);
  }

  openEditModal(account: Account): void {
    this.editingAccount.set(account);
    this.formError.set(null);
    this.formModalOpen.set(true);
  }

  closeFormModal(): void {
    this.formModalOpen.set(false);
  }

  saveAccount(value: AccountFormValue): void {
    this.saving.set(true);
    this.formError.set(null);

    const editing = this.editingAccount();
    const request = editing
      ? this.accountService.update(editing.id, value)
      : this.accountService.create(this.slug(), value);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.formModalOpen.set(false);
        this.loadAccounts();
        this.toastService.success(editing ? 'Cuenta actualizada correctamente.' : 'Cuenta creada correctamente.');
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.formError.set(this.resolveErrorMessage(error));
      },
    });
  }

  confirmDelete(account: Account): void {
    this.deleteTarget.set(account);
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  performDelete(): void {
    const target = this.deleteTarget();
    if (!target) return;

    this.deleting.set(true);

    this.accountService.delete(target.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.deleteTarget.set(null);
        this.loadAccounts();
        this.toastService.success('Cuenta eliminada correctamente.');
      },
      error: () => {
        this.deleting.set(false);
        this.deleteTarget.set(null);
        this.toastService.error('No se pudo eliminar la cuenta.');
      },
    });
  }

  openProfiles(account: Account): void {
    this.profilesAccount.set(account);
  }

  closeProfiles(): void {
    this.profilesAccount.set(null);
  }

  onProfilesChanged(): void {
    this.loadAccounts();
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    const firstError = error.error?.errors?.[0]?.message;
    return firstError ?? 'No se pudo guardar la cuenta.';
  }
}
