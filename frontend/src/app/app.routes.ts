import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((m) => m.Layout),
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'netflix',
        loadComponent: () =>
          import('./pages/platform-accounts/platform-accounts').then((m) => m.PlatformAccounts),
        data: { slug: 'netflix', platformName: 'Netflix', colorVar: '--color-netflix' },
      },
      {
        path: 'disney',
        loadComponent: () =>
          import('./pages/platform-accounts/platform-accounts').then((m) => m.PlatformAccounts),
        data: { slug: 'disney', platformName: 'Disney+', colorVar: '--color-disney' },
      },
      {
        path: 'amazon-prime',
        loadComponent: () =>
          import('./pages/platform-accounts/platform-accounts').then((m) => m.PlatformAccounts),
        data: { slug: 'amazon-prime', platformName: 'Amazon Prime', colorVar: '--color-amazon' },
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
