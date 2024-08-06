import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../../services/data-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup | any;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  rpwd: FormControl | any;
  dropdownData: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  intrestListDropdown: any;
  minDate: string | undefined;

  constructor(private _fb: FormBuilder, private _router: Router, private _userService: DataServiceService, private _toaster: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      //Validations
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
      profilePicture: new FormControl(null, [Validators.required]),
      interests: new FormControl(null, [Validators.required]),
      about: new FormControl(null, [Validators.required])
    });
    this.rpwd = new FormControl(null, [Validators.required]);
    this.initializeDropdown();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'ID',
      textField: 'Value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
  }
  //Form Submit
  onSubmit() {
    if (this.registerForm.value.password === this.rpwd.value) {
      this.registerMethod();
    }
  }

  //Calls the user registration API.
  registerMethod() {
    let payload = this.registerForm.getRawValue();
    payload.interests = payload.interests.map((obj: any) => { return obj.id })
    this._userService.userRegister(payload).subscribe(
      (response: any) => {
        if (response.success) {
          this._toaster.success("Registration successful");
          this._router.navigate(['/login']);
        }
      },
      (error: any) => {
        console.error('Error adding data:', error);
      }
    );
    this._router.navigate(['/login']);
  }
  //Toggles visibility of password field
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  //Toggles visibility of confirm password field
  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  //Initialize minimum date for any date picker
  initializeMinDate(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }
  //Loads interests data for dropdown
  initializeDropdown(): void {
    this._userService.dropDownIntrest().subscribe(
      (response: any) => {
        if (response.success) {
          this.dropdownData = [];
          response.data.forEach((element: any) => {
            let tempObj = {
              ID: element.id,
              Value: element.Interest
            }
            this.dropdownData.push(tempObj)
          })
          this.dropdownSettings = {
            idField: 'ID',
            textField: 'Value',
            allowSearchFilter: true,
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            itemsShowLimit: 10
          };
        } else {
          this._toaster.error(response.message);
        }
      },
      (error: any) => {
        this._toaster.error(error.error.message || error.statusText);
      }
    );
  }
}
