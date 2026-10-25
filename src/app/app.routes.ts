import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './authorization/auth.guard'; 

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
// Route réservée aux Administrateurs
  { 
    path: 'admin/dashboard', 
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard],
    data: { role: 'ADMIN' }
  },

  // Route pour les Employés (et accessible aux admins si besoin)
  { 
    path: 'staff/dashboard', 
    loadComponent: () => import('./staff-dashboard/staff-dashboard.component').then(m => m.StaffDashboardComponent),
    canActivate: [authGuard]
  },
];
