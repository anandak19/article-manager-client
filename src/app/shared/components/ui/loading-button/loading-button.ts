import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-button',
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: './loading-button.html',
  styleUrl: './loading-button.scss',
})
export class LoadingButton {
  @Input() disabled = false;
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() isLoading = signal(false); // *
  @Input() text!: string; // *

  @Output() clickEvent = new EventEmitter();
  onBtnClick() {
    this.clickEvent.emit();
  }
}
