import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '../../../shared/components/modal/modal';
import { Client, ClientFormValue } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-form-modal',
  imports: [Modal, ReactiveFormsModule],
  templateUrl: './client-form-modal.html',
  styleUrl: './client-form-modal.css',
})
export class ClientFormModal {
  private readonly fb = inject(FormBuilder);

  readonly client = input<Client | null>(null);
  readonly saving = input(false);
  readonly errorMessage = input<string | null>(null);

  readonly save = output<ClientFormValue>();
  readonly cancel = output<void>();

  readonly isEdit = computed(() => this.client() !== null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    effect(() => {
      const client = this.client();
      if (client) {
        this.form.patchValue({ name: client.name, phone: client.phone });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit(this.form.getRawValue());
  }
}
