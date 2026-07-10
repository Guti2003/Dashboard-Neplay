import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

const AUTO_DISMISS_MS = 4000;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastsSignal = signal<Toast[]>([]);
  private nextId = 1;

  readonly toasts = this.toastsSignal.asReadonly();

  success(message: string): void {
    this.push('success', message);
  }

  error(message: string): void {
    this.push('error', message);
  }

  info(message: string): void {
    this.push('info', message);
  }

  dismiss(id: number): void {
    this.toastsSignal.update((list) => list.filter((toast) => toast.id !== id));
  }

  private push(type: ToastType, message: string): void {
    const id = this.nextId++;
    this.toastsSignal.update((list) => [...list, { id, type, message }]);
    setTimeout(() => this.dismiss(id), AUTO_DISMISS_MS);
  }
}
