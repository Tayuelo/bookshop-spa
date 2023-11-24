import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';

export const MarketplaceGuard: CanMatchFn = (
  route,
  state
): UrlTree | boolean => {
  const router = inject(Router);
  return router.parseUrl('/login');
};
