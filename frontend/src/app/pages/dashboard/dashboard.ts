import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardStats } from '../../core/models/dashboard.model';
import { GlassShineDirective } from '../../shared/directives/glass-shine.directive';

@Component({
  selector: 'app-dashboard',
  imports: [GlassShineDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly authService = inject(AuthService);
  private readonly dashboardService = inject(DashboardService);

  readonly currentUser = this.authService.currentUser;

  readonly stats = signal<DashboardStats | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.loadStats();
  }

  loadStats(): void {
    this.loading.set(true);
    this.error.set(null);

    this.dashboardService.getStats().subscribe({
      next: (stats) => {
        this.stats.set(stats);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las estadísticas. Intenta de nuevo.');
        this.loading.set(false);
      },
    });
  }
}
