import { Routes } from '@angular/router';
import { ListMyArticles } from './pages/list-my-articles/list-my-articles';
import { ViewMyOneArticle } from './pages/view-my-one-article/view-my-one-article';
import { EditArticle } from './pages/edit-article/edit-article';

export const MyArticlesRoutes: Routes = [
  {
    path: '',
    component: ListMyArticles,
  },
  {
    path: ':articleId',
    component: ViewMyOneArticle,
  },
  {
    path: ':articleId/edit',
    component: EditArticle,
  },
];
