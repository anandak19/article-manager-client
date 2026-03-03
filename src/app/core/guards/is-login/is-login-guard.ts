import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/service/auth/auth-service';
import { catchError, map, of } from 'rxjs';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  const currUser = _authService.getCurrUser();
  if (currUser) return false;

  return _authService.fetchCurrUser().pipe(
    map((res) => {
      if (res.data) {
        _authService.setCurrUser(res.data);
        return _router.createUrlTree(['/']);
      }
      return true;
    }),
    catchError(() => {
      return of(true);
    }),
  );
};
