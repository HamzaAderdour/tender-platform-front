import { Routes } from '@angular/router';

// 1. Tes imports existants
import { LoginComponent } from './features/auth/login/login';
import { DashboardComponent } from './features/admin/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';

// 2. Les NOUVEAUX imports pour le module Owner
import { OwnerDashboardComponent } from './features/owner/owner-dashboard/owner-dashboard';
import { CreateTenderComponent } from './features/owner/create-tender/create-tender';

export const routes: Routes = [
  // --- Routes Publiques ---
  { path: 'login', component: LoginComponent },
  
  // --- Routes Admin ---
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard] 
  },

  // --- NOUVEAU : Routes Owner ---
  { 
    path: 'owner/dashboard', 
    component: OwnerDashboardComponent, 
    canActivate: [authGuard] // Protégé aussi !
  },
  { 
    path: 'owner/create', 
    component: CreateTenderComponent, 
    canActivate: [authGuard] 
  },

  // --- Redirections ---
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Par défaut vers Admin pour l'instant
  { path: '**', redirectTo: 'dashboard' } // Erreur 404 -> vers Dashboard
];