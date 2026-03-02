import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IArticleDetails } from '@features/dashboard/models/article.model';
import { ViewArticle } from '@features/dashboard/components/view-article/view-article';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { UserArticleService } from '@features/dashboard/services/user-article/user-article-service';

@Component({
  selector: 'app-view-my-one-article',
  imports: [MatIcon, MatIconButton, ViewArticle],
  templateUrl: './view-my-one-article.html',
  styleUrl: './view-my-one-article.scss',
})
export class ViewMyOneArticle {
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _userArticleService = inject(UserArticleService);

  article = signal<IArticleDetails>({
    title: 'Thanks',
    content: '<p>hi</p>',
    createdAt: String(new Date()),
    writerName: 'Sharon',
    id: 'sdfds',
  });

  onEdit() {}

  onDelete() {}

  navigateBack() {
    this._router.navigate(['/mine']);
  }
}
