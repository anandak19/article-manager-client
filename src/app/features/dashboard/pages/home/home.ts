import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { IListArticle } from '@features/dashboard/models/article.model';
import { ArticleService } from '@features/dashboard/services/article/article-service';
import { IErrorResponse, IPaginationMeta } from 'app/types/api-response.types';
import { IPaginationQuery } from 'app/types/query-filters.types';
import { ArticleCard } from "@features/dashboard/components/article-card/article-card";
import { PaginatorComponent } from "@shared/components/feature/paginator-component/paginator-component";

@Component({
  selector: 'app-home',
  imports: [ArticleCard, PaginatorComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _articleService = inject(ArticleService);

  pagination = signal<IPaginationQuery>({
    page: 1,
  });

  articles = signal<IListArticle[]>([]);
  paginationMeta = signal<IPaginationMeta>({} as IPaginationMeta);

  findAllArticles() {
    this._articleService
      .findAllArticles(this.pagination())
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
    this.findAllArticles();
  }

  onViewArticle(id: string) {
    this._router.navigate([`article/${id}`], { relativeTo: this._activatedRoute });
  }

  ngOnInit(): void {
    this.findAllArticles();
  }
}
