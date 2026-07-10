import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { GlassShineDirective } from '../../shared/directives/glass-shine.directive';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, GlassShineDirective],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly authService = inject(AuthService);

  readonly menuToggle = output<void>();
  readonly search = output<string>();

  readonly currentUser = this.authService.currentUser;

  readonly today = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  searchTerm = '';

  onSearchChange(value: string): void {
    this.search.emit(value.trim());
  }
}
