import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../../services/data-service.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  hidePassword: boolean = true;
    users: any;

  constructor(private _fb: FormBuilder, private _router: Router, private _userService: DataServiceService, private _toaster: ToastrService, private _cookieService: CookieService) {
    this.loginForm = this._fb.group({
      //Validations
      email: [null, [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required,]]
    });
  }
  ngOnInit(): void {
  }
  //Call when Form submitted
  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    }
  }
  //Login API logic
  login() {
    this._userService.userLogin(this.loginForm.getRawValue()).subscribe(
      (response: any) => {
        if (response.success == true) {
          this._userService.tokenSubject.next(response.token);
          this._cookieService.set('userId', response.id);
          this._cookieService.set('token', response.token);
          this._toaster.success("Login successful");
          // console.log(response)
          this._router.navigate(['/explore-page']);
        } else {
          this._toaster.error("Login Failed");
        }
      },
      (error: any) => {
        console.log();

        this._toaster.error(error.error.message);
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
