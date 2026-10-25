import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifie si l'utilisateur possède un token valide
  if (authService.isAuthenticated()) {
    const user = authService.getCurrentUser();
    
    // Optionnel : Vérification par rôle si requis par la route (ex: data: { role: 'ADMIN' })
    const expectedRole = route.data?.['role'];
    if (expectedRole && user?.role !== expectedRole) {
      // Redirection si l'utilisateur n'a pas le bon rôle
      router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }

  // Non authentifié ou token expiré : Redirection vers la page de login
  authService.logout();
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};