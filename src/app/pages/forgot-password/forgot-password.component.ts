import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup | any;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: DataServiceService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this._fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.mustMatch('newPassword', 'confirmPassword')
    });
  }
  //This method is called when the form is submitted.
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.forgotPass();
    }
  }
  //This method calls the forgot password API to reset the user's password.
  forgotPass() {
    this._userService.postForgot(this.forgotPasswordForm.getRawValue()).subscribe(
      (response: any) => {
        if (response.success) {
          this._toastr.success("Password reset successfully");
          this._router.navigate(['/login']);
        } else {
          this._toastr.error(response.message || "Password reset failed");
        }
      },
      (error: any) => {
        console.error('Error resetting password:', error);
        this._toastr.error("An error occurred while resetting the password. Please try again.");
      }
    );
  }
  //This method is a custom validator that checks if the two passwords match.
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }
}
