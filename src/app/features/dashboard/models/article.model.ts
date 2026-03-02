export interface ICreateArticle {
  title: string;
  content: string;
}

export interface IArticle extends ICreateArticle {
  id: string;
  userId: string;
  createdAt: string;
}

export interface IListArticle extends Pick<IArticle, 'title' | 'id' | 'createdAt'> {
  writerName: string;
}

export interface IArticleDetails extends IListArticle {
  content: string;
}
