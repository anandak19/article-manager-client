import { Component, Input } from '@angular/core';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-article-preview',
  imports: [QuillModule],
  templateUrl: './article-preview.html',
  styleUrl: './article-preview.scss',
})
export class ArticlePreview {
  @Input() content!: string | null;
  @Input() title!: string | null;
}
