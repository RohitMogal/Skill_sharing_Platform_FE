import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from 'src/app/services/data-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-session',
  templateUrl: './request-session.component.html',
  styleUrls: ['./request-session.component.scss']
})
export class RequestSessionComponent implements OnInit {
  requestForm: FormGroup;

  constructor(private _userService: DataServiceService, private _toastr: ToastrService, private _router: Router, private _fb: FormBuilder) {
    this.requestForm = this._fb.group({
      Title: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }
//Submits the request form and sends a request to the API if the form is valid.
  onSubmit() {
    if (this.requestForm.valid) {
      this.requestMethod();
    } else {
      this._toastr.error("Form is not valid");
    }
  }
//Sends a request to the API to create a new session.
  requestMethod() {
    this._userService.requestSessions(this.requestForm.getRawValue()).subscribe(
      (response: any) => {
        if (response.success) {
          this._toastr.success("Request sent successfully");
          this._router.navigate(['/explore-page']);
        }
      },
      (error: any) => {
        console.error('Error adding data:', error);
        this._toastr.error("Failed to send request");
      }
    );
  }
}
