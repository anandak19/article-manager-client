import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IArticleDetails } from '@features/dashboard/models/article.model';
import { ViewArticle } from '@features/dashboard/components/view-article/view-article';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { UserArticleService } from '@features/dashboard/services/user-article/user-article-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IErrorResponse } from 'app/types/api-response.types';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogService } from '@core/service/dialog/dialog-service';

@Component({
  selector: 'app-view-my-one-article',
  imports: [MatIcon, MatIconButton, ViewArticle],
  templateUrl: './view-my-one-article.html',
  styleUrl: './view-my-one-article.scss',
})
export class ViewMyOneArticle implements OnInit {
  @Input() articleId!: string;

  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _userArticleService = inject(UserArticleService);
  private _dialogService = inject(DialogService);

  article = signal<IArticleDetails>({} as IArticleDetails);

  onEdit() {
    if (!this.articleId) return;
    this._router.navigate([`edit`], { relativeTo: this._activatedRoute });
  }

  onDelete() {
    if (!this.articleId) return;

    this._dialogService.ask().then((isYes) => {
      if (isYes) {
        this._userArticleService
          .deleteOne(this.articleId)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe({
            next: (res) => {
              this._router.navigate(['/mine']);
              this._snackbar.success(res.message);
            },
            error: (err: IErrorResponse) => {
              this._snackbar.error(err.message);
            },
          });
      }
    });
  }

  navigateBack() {
    this._router.navigate(['/mine']);
  }

  ngOnInit(): void {
    console.log(this.articleId);
    if (!this.articleId) return;
    this._userArticleService
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
