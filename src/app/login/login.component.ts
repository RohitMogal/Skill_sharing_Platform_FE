import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from '../data-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  hidePassword: any;
  users: any;
  // public getJsonValue:any;
  public postJsonValue: any;
  getjsonValue: any;

  constructor(private fb: FormBuilder, private _router: Router, private http: HttpClient, private _userService: DataServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }


  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
    this.login();
  }

  login() {
    if (this.loginForm.valid) {
      this._userService.userLogin(this.loginForm.getRawValue()).subscribe(
        (response: any) => {
          if (response) {
            console.log('New data added:', response);
            this._router.navigate(['/home']);
          }
        },
        (error: any) => {
          console.error('Error adding data:', error);
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  get Email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
}
