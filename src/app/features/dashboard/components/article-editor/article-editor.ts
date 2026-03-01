import { Component, signal } from '@angular/core';
import { Delta } from 'quill';
import { QuillModule, QuillModules } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlePreview } from '../article-preview/article-preview';
import { MatError, MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { LoadingButton } from '@shared/components/ui/loading-button/loading-button';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-article-editor',
  imports: [
    QuillModule,
    FormsModule,
    ArticlePreview,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatError,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    LoadingButton,
  ],
  templateUrl: './article-editor.html',
  styleUrl: './article-editor.scss',
})
export class ArticleEditor {
  content: Delta | null = null;
  conentToShow = signal<Delta>({} as Delta);
  savedConent!: Delta;

  isEditMode = signal(true);

  toggleMode() {
    this.isEditMode.set(!this.isEditMode());
  }

  modules: QuillModules = {
    toolbar: [
      [{ header: 1 }, { header: 2 }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, false] }],
      [{ font: [] }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
      ['link'],
    ],
  };
}
