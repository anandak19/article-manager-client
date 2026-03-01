import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { LoadingButton } from '@shared/components/ui/loading-button/loading-button';

@Component({
  selector: 'app-list-my-articles',
  imports: [LoadingButton],
  templateUrl: './list-my-articles.html',
  styleUrl: './list-my-articles.scss',
})
export class ListMyArticles {
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  navigateCreate() {
    this._router.navigate(['/create']);
  }
}
