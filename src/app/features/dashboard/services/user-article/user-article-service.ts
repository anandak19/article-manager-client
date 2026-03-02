import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateArticle, IListArticle } from '@features/dashboard/models/article.model';
import { IBaseResponse, IPaginatedResult, ISuccessResponse } from 'app/types/api-response.types';
import { IPaginationQuery } from 'app/types/query-filters.types';

@Injectable({
  providedIn: 'root',
})
export class UserArticleService {
  private _http = inject(HttpClient);
  private API_ENDPOINT = 'user/article';

  create(article: ICreateArticle) {
    return this._http.post<IBaseResponse>(`${this.API_ENDPOINT}`, article);
  }

  deleteOne(articleId: string) {
    return this._http.delete<IBaseResponse>(`${this.API_ENDPOINT}/${articleId}`);
  }

  findAllUserArticles(pagination: IPaginationQuery) {
    const params = new HttpParams({ fromObject: { ...pagination } });
    return this._http.get<ISuccessResponse<IPaginatedResult<IListArticle>>>(
      `${this.API_ENDPOINT}`,
      { params },
    );
  }
}
