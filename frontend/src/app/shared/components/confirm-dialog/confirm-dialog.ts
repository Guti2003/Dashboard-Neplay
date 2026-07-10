import { Component, input, output } from '@angular/core';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-confirm-dialog',
  imports: [Modal],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  readonly title = input('¿Estás seguro?');
  readonly message = input('');
  readonly confirmLabel = input('Eliminar');
  readonly cancelLabel = input('Cancelar');
  readonly danger = input(true);
  readonly loading = input(false);

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}
