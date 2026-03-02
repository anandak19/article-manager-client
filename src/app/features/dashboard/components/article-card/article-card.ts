import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListArticle } from '@features/dashboard/models/article.model';

@Component({
  selector: 'app-article-card',
  imports: [DatePipe],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  @Input() articleData!: IListArticle;
  @Output() viewArticle = new EventEmitter<string>();

  onViewArticle(id: string) {
    this.viewArticle.emit(id);
  }
}
