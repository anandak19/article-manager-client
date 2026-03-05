import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Delta } from 'quill';
import { QuillModule, QuillModules } from 'ngx-quill';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ArticlePreview } from '../article-preview/article-preview';
import { MatError, MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { LoadingButton } from '@shared/components/ui/loading-button/loading-button';
import { MatButton } from '@angular/material/button';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { IArticleDetails, ICreateArticle } from '@features/dashboard/models/article.model';
import { UserArticleService } from '@features/dashboard/services/user-article/user-article-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IErrorResponse } from 'app/types/api-response.types';

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
    MatButton,
    ReactiveFormsModule,
    LoadingButton,
  ],
  templateUrl: './article-editor.html',
  styleUrl: './article-editor.scss',
})
export class ArticleEditor implements OnInit {
  @Input() ariticleId!: string;
  @Input() isFormSubmited = signal(false);
  @Input() isLoading = signal(false);
  @Output() articleData = new EventEmitter<ICreateArticle>();

  conentToShow = signal<Delta>({} as Delta);
  savedConent!: Delta;

  isEditMode = signal(true);

  articleForm!: FormGroup<{
    title: FormControl<string>;
    content: FormControl<string | null>;
  }>;

  modules: QuillModules = {
    toolbar: [
      [{ header: 1 }, { header: 2 }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ font: [] }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
      ['link'],
    ],
  };

  private _fb = inject(FormBuilder);
  private _snackbarService = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _userArticleService = inject(UserArticleService);

  toggleMode() {
    this.isEditMode.set(!this.isEditMode());
  }

  initForm() {
    this.articleForm = this._fb.group({
      title: this._fb.nonNullable.control('', Validators.required),
      content: this._fb.control<string | null>(null, [this.contentValidator(500000)]),
    });
  }

  patchForm(data: IArticleDetails) {
    if (!this.articleForm) return;

    this.articleForm.patchValue({
      title: data.title,
      content: data.content,
    });
  }

  contentValidator(max: number): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value as string;

      if (!value || value === '<p><br></p>') {
        return { required: true };
      }

      // Remove HTML tags
      const plainText = value.replace(/<[^>]*>/g, '').trim();

      if (plainText.length === 0) {
        return { required: true };
      }

      if (plainText.length > max) {
        return { maxlength: true };
      }

      return null;
    };
  }

  get content(): string | null {
    return this.articleForm.get('content')?.value ?? null;
  }

  get title(): string | null {
    return this.articleForm.get('title')?.value ?? null;
  }

  onSubmit() {
    this.isFormSubmited.set(true);

    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      return;
    }

    const formData = this.articleForm.getRawValue();

    const article: ICreateArticle = {
      title: formData.title,
      content: formData.content!,
    };

    this.articleData.emit(article);
  }

  populateArticleDetails(id: string) {
    this._userArticleService
      .findOneById(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.patchForm(res.data);
        },
        error: (err: IErrorResponse) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    this.initForm();
    if (this.ariticleId) {
      this.populateArticleDetails(this.ariticleId);
    }
  }
}
