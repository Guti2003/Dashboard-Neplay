import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NavItem } from '../../core/models/nav-item.model';
import { GlassShineDirective } from '../../shared/directives/glass-shine.directive';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', colorVar: '--color-accent', icon: 'dashboard' },
  { label: 'Netflix', path: '/netflix', colorVar: '--color-netflix', icon: 'netflix' },
  { label: 'Disney+', path: '/disney', colorVar: '--color-disney', icon: 'disney' },
  { label: 'Amazon Prime', path: '/amazon-prime', colorVar: '--color-amazon', icon: 'amazon' },
];

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, GlassShineDirective],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly open = input(false);
  readonly navigate = output<void>();

  readonly navItems = NAV_ITEMS;
  readonly currentUser = this.authService.currentUser;

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
