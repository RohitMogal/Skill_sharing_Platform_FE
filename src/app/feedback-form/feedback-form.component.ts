import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent  {
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      console.log('Feedback:', this.feedbackForm.value.comment);
      alert('Thank you for your feedback!');
      this.feedbackForm.reset();
    }
  }
}
