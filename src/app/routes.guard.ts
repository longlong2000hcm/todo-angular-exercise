import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';

export const AuthGuard: CanActivateFn = async () => {
  const authService = inject(AuthenticationService)
  const router = inject(Router);
  const redirectRoute = router.createUrlTree(['']);

  console.log('invoke only authorized route');

  await authService.auth.authStateReady();

  if (!authService.auth.currentUser) {
    console.log('denied')
    return redirectRoute;
  }

  console.log('passed')
  return true;
};

export const OnlyUnauthorizedGuard: CanActivateFn = async () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const redirectRoute = router.createUrlTree(['/app']);

  console.log('invoke only unauthorized route')

  await authService.auth.authStateReady();
  
  if (authService.auth.currentUser) {
    console.log('denied');
    return redirectRoute;
  }

  console.log('passed');
  return true;
}
