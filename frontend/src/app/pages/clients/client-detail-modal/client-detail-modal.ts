import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, input, output, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from '../../../shared/components/modal/modal';
import { ClientService } from '../../../core/services/client.service';
import { AccountService } from '../../../core/services/account.service';
import { ProfileService } from '../../../core/services/profile.service';
import { PlatformService } from '../../../core/services/platform.service';
import { ToastService } from '../../../core/services/toast.service';
import { Client, ClientMembership } from '../../../core/models/client.model';
import { Account } from '../../../core/models/account.model';
import { Platform } from '../../../core/models/platform.model';
import { PLATFORMS } from '../../../core/constants/platforms';
import { membershipLabel, membershipVariant } from '../../../shared/utils/membership';

type ProfileRow = FormGroup<{
  name: FormControl<string>;
  pin: FormControl<string>;
}>;

// Keep in sync with the `.maxLength(20)` cap on createProfilesBatchValidator
// (backend/app/validators/profile.ts) — this only bounds the UI input.
const MAX_QUANTITY = 20;

@Component({
  selector: 'app-client-detail-modal',
  imports: [Modal, ReactiveFormsModule],
  templateUrl: './client-detail-modal.html',
  styleUrl: './client-detail-modal.css',
})
export class ClientDetailModal implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly clientService = inject(ClientService);
  private readonly accountService = inject(AccountService);
  private readonly profileService = inject(ProfileService);
  private readonly platformService = inject(PlatformService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  readonly client = input.required<Client>();

  readonly close = output<void>();
  readonly changed = output<void>();

  readonly currentClient = signal<Client | null>(null);
  readonly refreshing = signal(false);

  readonly addFormOpen = signal(false);
  readonly platforms = PLATFORMS;
  readonly selectedPlatformSlug = signal<string | null>(null);
  readonly selectedPlatform = signal<Platform | null>(null);
  readonly accountsForPlatform = signal<Account[]>([]);
  readonly loadingAccounts = signal(false);
  readonly saving = signal(false);
  readonly formError = signal<string | null>(null);

  readonly membershipLabel = membershipLabel;
  readonly membershipVariant = membershipVariant;

  readonly form = this.fb.nonNullable.group({
    accountId: this.fb.control<number | null>(null, [Validators.required]),
    quantity: this.fb.nonNullable.control(1, [Validators.required, Validators.min(1), Validators.max(MAX_QUANTITY)]),
  });

  readonly profileRows = this.fb.array<ProfileRow>([]);
  readonly selectedAccountId = signal<number | null>(null);
  readonly showAccountPassword = signal(false);

  /** The full account record for the one selected in the "Cuenta" dropdown. */
  readonly selectedAccount = computed(() => {
    const accountId = this.selectedAccountId();
    if (!accountId) return null;
    return this.accountsForPlatform().find((a) => a.id === accountId) ?? null;
  });

  /** Remaining capacity on the selected account, given the platform's limit (null = unlimited). */
  readonly remainingCapacity = computed(() => {
    const platform = this.selectedPlatform();
    const account = this.selectedAccount();
    if (!platform || platform.maxProfilesPerAccount == null || !account) return null;

    return Math.max(platform.maxProfilesPerAccount - account.profilesCount, 0);
  });

  ngOnInit(): void {
    this.currentClient.set(this.client());
  }

  refresh(): void {
    const id = this.currentClient()?.id;
    if (!id) return;

    this.refreshing.set(true);
    this.clientService.get(id).subscribe({
      next: (client) => {
        this.currentClient.set(client);
        this.refreshing.set(false);
      },
      error: () => {
        this.refreshing.set(false);
      },
    });
  }

  openAccount(membership: ClientMembership): void {
    this.router.navigate(['/', membership.platform.slug], {
      queryParams: { openAccount: membership.accountId },
    });
    this.close.emit();
  }

  renewMembership(membership: ClientMembership): void {
    this.profileService.renew(membership.profileId).subscribe({
      next: () => {
        this.refresh();
        this.changed.emit();
        this.toastService.success('Membresía renovada por 30 días más.');
      },
      error: () => {
        this.toastService.error('No se pudo renovar la membresía.');
      },
    });
  }

  openAddForm(): void {
    this.addFormOpen.set(true);
    this.selectedPlatformSlug.set(null);
    this.resetAccountSelection();
    this.formError.set(null);
    this.form.reset({ accountId: null, quantity: 1 });
    this.profileRows.clear();
    this.profileRows.push(this.buildProfileRow());
  }

  closeAddForm(): void {
    this.addFormOpen.set(false);
  }

  selectPlatform(slug: string): void {
    this.selectedPlatformSlug.set(slug);
    this.resetAccountSelection();
    this.form.patchValue({ accountId: null });
    this.loadingAccounts.set(true);

    this.accountService.list(slug, { perPage: 100, sortBy: 'email', sortDir: 'asc' }).subscribe({
      next: ({ data }) => {
        this.accountsForPlatform.set(data);
        this.loadingAccounts.set(false);
      },
      error: () => {
        this.loadingAccounts.set(false);
      },
    });

    this.platformService.get(slug).subscribe({
      next: (platform) => this.selectedPlatform.set(platform),
    });
  }

  onAccountSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const accountId = value ? Number(value) : null;
    this.form.patchValue({ accountId });
    this.selectedAccountId.set(accountId);
    this.showAccountPassword.set(false);
  }

  toggleAccountPassword(): void {
    this.showAccountPassword.update((value) => !value);
  }

  /** Shared by openAddForm/selectPlatform so the two reset paths can't drift apart. */
  private resetAccountSelection(): void {
    this.selectedPlatform.set(null);
    this.selectedAccountId.set(null);
    this.showAccountPassword.set(false);
    this.accountsForPlatform.set([]);
  }

  /**
   * Resizes the profile rows as the admin types, without writing back into
   * the input's own value — doing so would fight the caret position and
   * make it impossible to clear the field to type a new number.
   */
  onQuantityInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    // While the field is transiently empty/invalid mid-edit, keep the
    // current row count instead of snapping back to 1.
    const quantity = this.clampQuantity(raw, this.profileRows.length || 1);
    this.resizeProfileRows(quantity);
  }

  /** Clamps to a valid integer once the admin is done editing the field. */
  onQuantityBlur(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    const quantity = this.clampQuantity(raw, 1);

    this.form.patchValue({ quantity });
    this.resizeProfileRows(quantity);
  }

  private clampQuantity(raw: string, fallback: number): number {
    const parsed = Number(raw);
    return raw !== '' && Number.isFinite(parsed) && parsed >= 1
      ? Math.min(Math.trunc(parsed), MAX_QUANTITY)
      : fallback;
  }

  private resizeProfileRows(quantity: number): void {
    while (this.profileRows.length < quantity) {
      this.profileRows.push(this.buildProfileRow());
    }
    while (this.profileRows.length > quantity) {
      this.profileRows.removeAt(this.profileRows.length - 1);
    }
  }

  private buildProfileRow(): ProfileRow {
    return this.fb.nonNullable.group({
      name: this.fb.nonNullable.control('', [Validators.required]),
      pin: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
    });
  }

  submitAdd(): void {
    this.profileRows.markAllAsTouched();

    if (this.form.invalid || this.profileRows.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { accountId } = this.form.getRawValue();
    if (!accountId) return;

    const client = this.currentClient();
    if (!client) return;

    const profiles = this.profileRows.controls.map((row) => row.getRawValue());

    this.saving.set(true);
    this.formError.set(null);

    this.profileService.createBatch(accountId, { clientId: client.id, profiles }).subscribe({
      next: () => {
        this.saving.set(false);
        this.addFormOpen.set(false);
        this.refresh();
        this.changed.emit();
        this.toastService.success(
          profiles.length > 1 ? `${profiles.length} membresías agregadas correctamente.` : 'Membresía agregada correctamente.'
        );
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        const firstError = error.error?.errors?.[0]?.message ?? error.error?.message;
        this.formError.set(firstError ?? 'No se pudo agregar la membresía.');
      },
    });
  }
}
