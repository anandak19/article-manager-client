import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { DashboardRoutes } from './features/dashboard/dashboard.routes';
import { authGuard } from '@core/guards/auth/auth-guard';
import { isLoginGuard } from '@core/guards/is-login/is-login-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'login',
        canActivate: [isLoginGuard],
        loadComponent: () => import('./features/auth/pages/login/login').then((c) => c.Login),
      },
      {
        path: 'signup',
        canActivate: [isLoginGuard],
        loadComponent: () => import('./features/auth/pages/signup/signup').then((c) => c.Signup),
      },
      {
        path: '',
        children: DashboardRoutes,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
