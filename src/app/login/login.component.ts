import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  hidePassword: any;
  private _userService: any;


  constructor(private fb: FormBuilder, private _router: Router, ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    // if (this.loginForm.valid) {
    //   console.log(this.loginForm.value);
    // } else {
    //   console.log('Form is invalid');
    // }
    if (this.loginForm.valid) {
      this._userService.loginPost(this.loginForm.getRawValue()).subscribe(
        (response: any) => {
          if (response) {
            console.log('register completed:', response);
            
            this._router.navigate(['/login']);
          }
        },
        (error: any) => {
          console.error('Error adding post:', error);
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.hidePassword=!this.hidePassword;
    }



  // async onSubmit(): Promise<void> {
  //   if (this.loginForm.valid) {
  //     const formData = this.loginForm.value;
  //     console.log('form data', formData)
  //     try {
  //       const response = await fetch('', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(formData)
  //       });
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       console.log('Success:', data);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }
  // }
  get Email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  get Password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
}
