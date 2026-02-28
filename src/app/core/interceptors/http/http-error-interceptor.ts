import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { IErrorResponse } from 'app/types/api-response.types';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const err = error.error as IErrorResponse;
      console.error(err);
      return throwError(() => err);
    }),
  );
};
