import { Component, computed, input, output, signal } from '@angular/core';
import { Account, AccountStatus } from '../../../core/models/account.model';
import { GlassShineDirective } from '../../../shared/directives/glass-shine.directive';

const STATUS_LABEL: Record<AccountStatus, string> = {
  activo: 'Activo',
  suspendido: 'Suspendido',
  vencido: 'Vencido',
};

const STATUS_COLOR_VAR: Record<AccountStatus, string> = {
  activo: '--color-success',
  suspendido: '--color-warning',
  vencido: '--color-danger',
};

@Component({
  selector: 'app-account-card',
  imports: [GlassShineDirective],
  templateUrl: './account-card.html',
  styleUrl: './account-card.css',
})
export class AccountCard {
  readonly account = input.required<Account>();
  readonly colorVar = input.required<string>();

  readonly viewProfiles = output<void>();
  readonly edit = output<void>();
  readonly remove = output<void>();

  readonly showPassword = signal(false);

  readonly statusLabel = computed(() => STATUS_LABEL[this.account().status]);
  readonly statusColorVar = computed(() => STATUS_COLOR_VAR[this.account().status]);

  togglePassword(): void {
    this.showPassword.update((value) => !value);
  }
}
