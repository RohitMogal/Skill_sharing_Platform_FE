import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  repeatPass: string = 'none';
  registerForm!: FormGroup;

  hidePassword: any;

  constructor(private fb: FormBuilder, private _router: Router,  private http: HttpClient, private _userService: DataServiceService) {
    this.registerForm = this.fb.group({
      fullName: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-zA-Z].*")
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]),
      rpwd: new FormControl('', [Validators.required,]),

    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.Password.value == this.ConfirmPassword.value) {
      console.log(this.registerForm.value);
      this.repeatPass = 'none';
    } else {
      this.repeatPass = 'inline';
    }
    this.registerMethod();
  }

  registerMethod() {
    if (this.registerForm.valid) {
      this._userService.userRegister(this.registerForm.getRawValue()).subscribe(
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
  getMethod() {
  }

  get FullName(): FormControl {
    return this.registerForm.get("fullName") as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get("lastName") as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.registerForm.get("rpwd") as FormControl;
  }

}
