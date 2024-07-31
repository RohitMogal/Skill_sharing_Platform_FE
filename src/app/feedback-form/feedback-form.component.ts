import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from '../services/data-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent  {
  feedbackForm: FormGroup |any;

  constructor(private fb: FormBuilder, private _userService: DataServiceService, private _toastr: ToastrService, private _router:Router) {
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
    this.feedbackMethod();
  }

  feedbackMethod(){
    this._userService.feedbackApi(this.feedbackForm.getRawValue()).subscribe(
      (response: any) => {
        if (response.success) {
          this._toastr.success("Request sent successfully");
          this._router.navigate(['/my-activity']);
        }
      },
      (error: any) => {
        console.error('Error adding data:', error);
        this._toastr.error("Failed to send request");
      }
    );
  }
}
