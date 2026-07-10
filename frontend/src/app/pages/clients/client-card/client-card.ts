import { Component, computed, input, output } from '@angular/core';
import { Client } from '../../../core/models/client.model';
import { GlassShineDirective } from '../../../shared/directives/glass-shine.directive';
import { membershipLabel, membershipVariant } from '../../../shared/utils/membership';

@Component({
  selector: 'app-client-card',
  imports: [GlassShineDirective],
  templateUrl: './client-card.html',
  styleUrl: './client-card.css',
})
export class ClientCard {
  readonly client = input.required<Client>();

  readonly viewDetails = output<void>();
  readonly edit = output<void>();
  readonly remove = output<void>();

  readonly membershipLabel = membershipLabel;
  readonly membershipVariant = membershipVariant;

  readonly initials = computed(() => {
    const parts = this.client().name.trim().split(/\s+/);
    const first = parts[0]?.charAt(0) ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (first + last).toUpperCase();
  });
}
