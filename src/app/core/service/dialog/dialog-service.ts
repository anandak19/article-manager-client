import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '@shared/components/feature/confirm-dialog/confirm-dialog';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _dialog = inject(MatDialog);

  ask(): Promise<boolean> {
    const dialogRef = this._dialog.open(ConfirmDialog, {
      enterAnimationDuration: '90ms',
    });

    return lastValueFrom(dialogRef.afterClosed());
  }
}
