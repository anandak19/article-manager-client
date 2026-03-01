import { Component, DestroyRef, inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { ArticleEditor } from "@features/dashboard/components/article-editor/article-editor";

@Component({
  selector: 'app-create-article',
  imports: [MatButtonModule, MatIconButton, MatIcon, ArticleEditor],
  templateUrl: './create-article.html',
  styleUrl: './create-article.scss',
})
export class CreateArticle {
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  navigateBack() {
    this._router.navigate(['/mine']);
  }
}
