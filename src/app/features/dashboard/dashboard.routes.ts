import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ViewOneArticle } from './pages/view-one-article/view-one-article';
import { CreateArticle } from './pages/create-article/create-article';
import { MyArticleLayout } from './pages/my-articles/my-article-layout/my-article-layout';
import { MyArticlesRoutes } from './pages/my-articles/my-articles.routes';
import { authGuard } from '@core/guards/auth/auth-guard';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'create',
    canActivate: [authGuard],
    component: CreateArticle,
  },
  {
    path: 'mine',
    canActivate: [authGuard],
    component: MyArticleLayout,
    children: MyArticlesRoutes,
  },
  {
    path: 'article/:id',
    component: ViewOneArticle,
  },
];

/**
 * path: /
 * compoent: home - show all articles here
 *
 * path: /id
 * component: view one article page - (view article comopent used inside)
 *
 * path: /create
 * compoent: crete article component - (write article compoent with no data passed)
 *
 * path: /mine
 * compoent: myArticles layout
 *  route file:
 *      path: '',
 *      compoent: list my articles only here
 *
 *      path: '/id',
 *      compoent: view one article page - (view article comopent used inside: pass edit action true)
 *
 *      path: '/id/edit'
 *      compoent: edit aritcle component (write article compoent with article id passed)
 *
 */
