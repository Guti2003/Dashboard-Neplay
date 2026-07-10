import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '../../../shared/components/modal/modal';
import { Account, AccountFormValue, AccountStatus } from '../../../core/models/account.model';

@Component({
  selector: 'app-account-form-modal',
  imports: [Modal, ReactiveFormsModule],
  templateUrl: './account-form-modal.html',
  styleUrl: './account-form-modal.css',
})
export class AccountFormModal {
  private readonly fb = inject(FormBuilder);

  readonly account = input<Account | null>(null);
  readonly platformName = input.required<string>();
  readonly saving = input(false);
  readonly errorMessage = input<string | null>(null);

  readonly save = output<AccountFormValue>();
  readonly cancel = output<void>();

  readonly isEdit = computed(() => this.account() !== null);
  readonly showPassword = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    status: ['activo' as AccountStatus],
    observations: [''],
  });

  constructor() {
    effect(() => {
      const account = this.account();
      if (account) {
        this.form.patchValue({
          email: account.email,
          password: account.password,
          status: account.status,
          observations: account.observations ?? '',
        });
      }
    });
  }

  togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit(this.form.getRawValue());
  }
}
