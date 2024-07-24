import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  hidePassword: any;
  users:any;


  constructor(private fb: FormBuilder, private _router: Router, private _userData: DataServiceService  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   
    // this._userData.user().subscribe((data: any)=>{
    //   this.users = data;
    // })
  }

  ngOnInit(): void {

  }

  onSubmit(data:any) {
    // if (this.loginForm.valid) {
    //   console.log(this.loginForm.value);
    // } else {
    //   console.log('Form is invalid');
    // }
    this._userData.saveUsers(data).subscribe((result)=>{
      console.warn(result);
    })
   
  }

  togglePasswordVisibility() {
    this.hidePassword=!this.hidePassword;
    }



  get Email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  get Password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
}
