import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Modal } from '../../../shared/components/modal/modal';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { ProfileService } from '../../../core/services/profile.service';
import { ToastService } from '../../../core/services/toast.service';
import { Account } from '../../../core/models/account.model';
import { Profile } from '../../../core/models/profile.model';

@Component({
  selector: 'app-profiles-modal',
  imports: [Modal, ConfirmDialog, ReactiveFormsModule],
  templateUrl: './profiles-modal.html',
  styleUrl: './profiles-modal.css',
})
export class ProfilesModal implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly profileService = inject(ProfileService);
  private readonly toastService = inject(ToastService);

  readonly account = input.required<Account>();

  readonly close = output<void>();
  readonly changed = output<void>();

  readonly profiles = signal<Profile[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly formOpen = signal(false);
  readonly editingProfile = signal<Profile | null>(null);
  readonly saving = signal(false);
  readonly formError = signal<string | null>(null);

  readonly deleteTarget = signal<Profile | null>(null);
  readonly deleting = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    pin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    assignedUser: [''],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.profileService.list(this.account().id, { perPage: 50, sortBy: 'name', sortDir: 'asc' }).subscribe({
      next: ({ data }) => {
        this.profiles.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los perfiles.');
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.editingProfile.set(null);
    this.formError.set(null);
    this.form.reset({ name: '', pin: '', assignedUser: '' });
    this.formOpen.set(true);
  }

  openEdit(profile: Profile): void {
    this.editingProfile.set(profile);
    this.formError.set(null);
    this.form.reset({
      name: profile.name,
      pin: profile.pin,
      assignedUser: profile.assignedUser ?? '',
    });
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.formError.set(null);

    const editing = this.editingProfile();
    const value = this.form.getRawValue();
    const request = editing
      ? this.profileService.update(editing.id, value)
      : this.profileService.create(this.account().id, value);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.formOpen.set(false);
        this.load();
        this.changed.emit();
        this.toastService.success(editing ? 'Perfil actualizado correctamente.' : 'Perfil creado correctamente.');
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.formError.set(this.resolveErrorMessage(error));
      },
    });
  }

  confirmDelete(profile: Profile): void {
    this.deleteTarget.set(profile);
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  performDelete(): void {
    const target = this.deleteTarget();
    if (!target) return;

    this.deleting.set(true);

    this.profileService.delete(target.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.deleteTarget.set(null);
        this.load();
        this.changed.emit();
        this.toastService.success('Perfil eliminado correctamente.');
      },
      error: () => {
        this.deleting.set(false);
        this.deleteTarget.set(null);
        this.toastService.error('No se pudo eliminar el perfil.');
      },
    });
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    const firstError = error.error?.errors?.[0]?.message;
    return firstError ?? 'No se pudo guardar el perfil.';
  }
}
