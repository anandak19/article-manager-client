import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { ArticleEditor } from '@features/dashboard/components/article-editor/article-editor';
import { ICreateArticle } from '@features/dashboard/models/article.model';
import { ArticleService } from '@features/dashboard/services/article/article-service';
import { UserArticleService } from '@features/dashboard/services/user-article/user-article-service';
import { IErrorResponse } from 'app/types/api-response.types';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-article',
  imports: [MatButtonModule, MatIconButton, MatIcon, ArticleEditor],
  templateUrl: './create-article.html',
  styleUrl: './create-article.scss',
})
export class CreateArticle {
  isFormSubmited = signal(false);
  isLoading = signal(false);

  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _userArticleService = inject(UserArticleService);

  navigateBack() {
    this._router.navigate(['/mine']);
  }

  handleNewArticle(article: ICreateArticle) {
    this.isFormSubmited.set(true);
    this.isLoading.set(true);

    this._userArticleService
      .create(article)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
          this._router.navigate(['/mine']);
        },
        error: (err: IErrorResponse) => {
          this._snackbar.error(err.message);
        },
      });
  }
}
