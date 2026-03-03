import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { ViewArticle } from '@features/dashboard/components/view-article/view-article';
import { IArticleDetails } from '@features/dashboard/models/article.model';
import { ArticleService } from '@features/dashboard/services/article/article-service';
import { IErrorResponse } from 'app/types/api-response.types';

@Component({
  selector: 'app-view-one-article',
  imports: [MatIcon, ViewArticle, MatIconButton],
  templateUrl: './view-one-article.html',
  styleUrl: './view-one-article.scss',
})
export class ViewOneArticle {
  @Input() articleId!: string;

  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _articleService = inject(ArticleService);

  article = signal<IArticleDetails>({} as IArticleDetails);

  navigateBack() {
    this._router.navigate(['/']);
  }

  ngOnInit(): void {
    console.log(this.articleId);
    if (!this.articleId) return;
    this._articleService
      .findOneById(this.articleId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.article.set(res.data);
        },
        error: (err: IErrorResponse) => {
          this._snackbar.error(err.message);
        },
      });
  }
}
