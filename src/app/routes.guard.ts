import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';

export const AuthGuard: CanActivateFn = async () => {
  const authService = inject(AuthenticationService)
  const router = inject(Router);
  const redirectRoute = router.createUrlTree(['']);

  await authService.auth.authStateReady();

  if (!authService.auth.currentUser) {
    return redirectRoute;
  }

  return true;
};

export const OnlyUnauthorizedGuard: CanActivateFn = async () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const redirectRoute = router.createUrlTree(['/app']);

  await authService.auth.authStateReady();
  
  if (authService.auth.currentUser) {
    return redirectRoute;
  }

  return true;
}
