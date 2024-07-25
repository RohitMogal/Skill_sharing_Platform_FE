import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../services/data-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  hidePassword: any;
  users: any;
  constructor(private _fb: FormBuilder, private _router: Router, private _userService: DataServiceService, private _toaster: ToastrService) {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required,]]
    });
  }
  ngOnInit(): void { }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    }
  }
  login() {
    this._userService.userLogin(this.loginForm.getRawValue()).subscribe(
      (response: any) => {
        if (response) {
          
          this._userService.token=response.token;
          this._userService.getSessions().subscribe();
          this._toaster.success("Login successful");
          this._router.navigate(['/home']);
        }
      },
      (error: any) => {
        this._toaster.error("Login failed");
       
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
