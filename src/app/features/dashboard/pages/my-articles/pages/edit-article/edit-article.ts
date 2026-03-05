import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { ArticleEditor } from '@features/dashboard/components/article-editor/article-editor';
import { IUpdateArticle } from '@features/dashboard/models/article.model';
import { UserArticleService } from '@features/dashboard/services/user-article/user-article-service';
import { IErrorResponse } from 'app/types/api-response.types';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-article',
  imports: [MatButtonModule, MatIconButton, MatIcon, ArticleEditor],
  templateUrl: './edit-article.html',
  styleUrl: './edit-article.scss',
})
export class EditArticle {
  @Input() articleId!: string;

  isFormSubmited = signal(false);
  isLoading = signal(false);

  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _userArticleService = inject(UserArticleService);

  navigateBack() {
    this._router.navigate([`/mine/${this.articleId}`]);
  }

  updateArticle(article: IUpdateArticle) {
    this.isLoading.set(true);

    this._userArticleService
      .updateArticle(this.articleId, article)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._snackbar.success('Updated');
          this.navigateBack();
        },
        error: (err: IErrorResponse) => {
          this._snackbar.success(err.message);
        },
      });
  }
}
