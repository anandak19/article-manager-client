import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/service/auth/auth-service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  const currUser = _authService.getCurrUser();
  if (currUser) return true;

  return _authService.fetchCurrUser().pipe(
    map((res) => {
      if (res.data) {
        _authService.setCurrUser(res.data);
        return true;
      }
      return _router.createUrlTree(['/login']);
    }),
    catchError(() => {
      return of(_router.createUrlTree(['/login']));
    }),
  );
};
