import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IArticleDetails, IListArticle } from '@features/dashboard/models/article.model';
import { IPaginatedResult, ISuccessResponse } from 'app/types/api-response.types';
import { IPaginationQuery } from 'app/types/query-filters.types';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _http = inject(HttpClient);
  private API_ENDPOINT = 'article';

  findAllArticles(pagination: IPaginationQuery) {
    const params = new HttpParams({ fromObject: { ...pagination } });
    return this._http.get<ISuccessResponse<IPaginatedResult<IListArticle>>>(
      `${this.API_ENDPOINT}`,
      { params },
    );
  }

  findOneById(id: string) {
    return this._http.get<ISuccessResponse<IArticleDetails>>(`${this.API_ENDPOINT}/${id}`);
  }
}
