import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { DashboardComponent } from './features/admin/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // Route publique
  { path: 'login', component: LoginComponent },
  
  // Route protégée par le Guard
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard] 
  },

  // Redirection par défaut (Le Guard renverra vers Login si pas connecté)
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  // Wildcard (optionnel, pour les 404)
  { path: '**', redirectTo: 'dashboard' }
];