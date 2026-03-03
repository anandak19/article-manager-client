import { DatePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { IArticleDetails } from '@features/dashboard/models/article.model';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-view-article',
  imports: [QuillModule, DatePipe],
  templateUrl: './view-article.html',
  styleUrl: './view-article.scss',
})
export class ViewArticle {
  @Input() articleDetails = signal<IArticleDetails>({} as IArticleDetails);
}
