import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { IListArticle } from '@features/dashboard/models/article.model';
import { UserArticleService } from '@features/dashboard/services/user-article/user-article-service';
import { PaginatorComponent } from '@shared/components/feature/paginator-component/paginator-component';
import { LoadingButton } from '@shared/components/ui/loading-button/loading-button';
import { IErrorResponse, IPaginationMeta } from 'app/types/api-response.types';
import { IPaginationQuery } from 'app/types/query-filters.types';
import { ArticleCard } from '@features/dashboard/components/article-card/article-card';

@Component({
  selector: 'app-list-my-articles',
  imports: [LoadingButton, PaginatorComponent, ArticleCard],
  templateUrl: './list-my-articles.html',
  styleUrl: './list-my-articles.scss',
})
export class ListMyArticles implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _userArticleService = inject(UserArticleService);

  pagination = signal<IPaginationQuery>({
    page: 1,
  });

  articles = signal<IListArticle[]>([]);
  paginationMeta = signal<IPaginationMeta>({} as IPaginationMeta);

  findAllMyArticles() {
    this._userArticleService
      .findAllUserArticles(this.pagination())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.articles.set(res.data.documents);
          this.paginationMeta.set(res.data.meta);
        },
        error: (err: IErrorResponse) => {},
      });
  }

  onPageChange(page: number) {
    this.pagination.update((curr) => ({ ...curr, page: page }));
    this.findAllMyArticles();
  }

  navigateCreate() {
    this._router.navigate(['/create']);
  }

  onViewArticle(id: string) {
    this._router.navigate([`${id}`], { relativeTo: this._activatedRoute });
  }

  ngOnInit(): void {
    this.findAllMyArticles();
  }
}
