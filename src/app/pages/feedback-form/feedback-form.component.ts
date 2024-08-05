import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from '../../services/data-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup | any;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number | any;
  constructor(private fb: FormBuilder, private _route: ActivatedRoute,
    private _router: Router, private _userService: DataServiceService, private _toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FeedbackFormComponent>) {
    this.feedbackForm = this.fb.group({
      FeedbackComment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      Rating: [''],
      SessionId: [this.data.SessionId],
    });
  }
  ngOnInit(): void {
  }
  //On submit event handler
  onSubmit() {
    if (this.feedbackForm.valid) {
      console.log('Feedback:', this.feedbackForm.value.comment);
      alert('Thank you for your feedback!');
      this.feedbackMethod();
    }
  }
//Feedback method
  feedbackMethod() {
    this._userService.feedbackApi(this.feedbackForm.getRawValue()).subscribe(
      (response: any) => {
        if (response.success) {
          this._toastr.success("Request sent successfully");
          this.dialogRef.close();
        }
      },
      (error: any) => {
        console.error('Error adding data:', error);
        this._toastr.error("Failed to send request");
      }
    );
  }
//Count star event handler
  countStar(star: any) {
    this.selectedValue = star;
    this.feedbackForm.get('Rating').patchValue(this.selectedValue)
    console.log('Value of star', star);
  }
}
