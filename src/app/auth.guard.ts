import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenStorageService = inject(TokenStorageService);

  if (!tokenStorageService.getToken()) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  if (state.url.includes('admin')) {
    if (tokenStorageService.getUser().roles[0] === 'ROLE_ADMIN') {
      return true;
    }
  }

  if (
    state.url.includes('checkout') ||
    state.url.includes('history') ||
    state.url.includes('change-info')
  ) {
    tokenStorageService.getUser().roles.includes('ROLE_USER');
    if (tokenStorageService.getUser().roles.includes('ROLE_USER')) {
      return true;
    }
  }
  router.navigateByUrl('/auth/login');
  return false;
};
