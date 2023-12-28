import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-feedback',
  standalone: true,
  imports: [],
  templateUrl: './dialog-feedback.component.html',
  styleUrl: './dialog-feedback.component.scss'
})
export class DialogFeedbackComponent {
  feedbackText!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {
    this.feedbackText = data.message;
  }

}
