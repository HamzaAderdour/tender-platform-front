import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérification simple : est-ce qu'on a un token ?
  if (authService.getToken()) {
    return true;
  } else {
    // Sinon, retour à la case départ
    console.warn('⛔ Accès refusé : redirection vers Login');
    router.navigate(['/login']);
    return false;
  }
};