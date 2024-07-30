import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup | any;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  rpwd: FormControl | any;

  constructor(private _fb: FormBuilder, private _router: Router, private _userService: DataServiceService, private _toster: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      fullName: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z].*")
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),      
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]),
      description: new FormControl(null, [Validators.required])
    });
    this.rpwd = new FormControl(null, [Validators.required]);
  }

  onSubmit() {
    if (this.registerForm.value.password === this.rpwd.value) {
      this.registerMethod();
    }
  }
// Registration form API logic
  registerMethod() {
    this._userService.userRegister(this.registerForm.getRawValue()).subscribe(
      (response: any) => {
        if (response.success) {
          this._toster.success("Registration successful");
          this._router.navigate(['/login']);
        }
      },
      (error: any) => {
        console.error('Error adding data:', error);
      }
    );
    this._router.navigate(['/login']);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
