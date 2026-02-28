import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private _snackbar = inject(MatSnackBar);

  success(message = 'Success') {
    return this._snackbar.open(message, 'Ok', {
      duration: 3000,
      panelClass: ['mat-snackbar-panel-custom', 'mode-success'],
    });
  }

  error(message = 'An Error Occoured') {
    return this._snackbar.open(message, 'Dismiss', {
      duration: 9000,
      panelClass: ['mat-snackbar-panel-custom', 'mode-error'],
    });
  }

  info(message: string) {
    return this._snackbar.open(message, 'Ok', {
      duration: 7000,
      panelClass: ['mat-snackbar-panel-custom', 'mode-info'],
    });
  }
}
