import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { DashboardRoutes } from './features/dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login').then((c) => c.Login),
      },
      {
        path: 'signup',
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
