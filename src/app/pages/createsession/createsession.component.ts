// src/app/components/createsession/createsession.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DataServiceService } from '../../services/data-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-createsession',
  templateUrl: './createsession.component.html',
  styleUrls: ['./createsession.component.css']
})
export class CreatesessionComponent implements OnInit {
  sessionForm: FormGroup | any;
  minDate: any;
  hours: number[] = [];
  minutes: number[] = [];
  amPm: string[] = ['AM', 'PM'];
  dropdownData: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _userService: DataServiceService,
    private _toaster: ToastrService,
    private _router: Router
  ) {
    this.sessionForm = this._fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Link: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required],
      minute: ['', Validators.required],
      period: ['AM', Validators.required],
      interests: [this.selectedItems],
      amount:['0.00', Validators.required]
    });
    this.hours = Array.from({ length: 12 }, (_, i) => i + 1);
    this.minutes = Array.from({ length: 60 }, (_, i) => i);
  }

  ngOnInit(): void {
    this.initializeMinDate();
    this.initializeDropdown();
  }

  initializeMinDate(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  initializeDropdown(): void {
    this.dropdownData = [
      { ID: 1, Value: 'Reactjs' },
      { ID: 2, Value: 'Angular' },
      { ID: 3, Value: 'C#' },
      { ID: 4, Value: 'Java' },
      { ID: 5, Value: 'Nodejs' }
    ];
    this.dropdownSettings = {
      idField: 'ID',
      textField: 'Value',
      allowSearchFilter: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 5
    };
  }
  
  onSubmit(): void {
    if (this.sessionForm.valid) {
      this.createSession();
    }
    this._router.navigate(['/explore-page'])
  }

  createSession(): void {
    const formValues = this.sessionForm.getRawValue();
    let sessionTime:any = new Date(`${formValues.date} ${formValues.hour}:${formValues.minute} ${formValues.period}`);
    sessionTime=moment().format("YYYY-MM-DD HH:MM")
    const sessionData = {
      UserId: 'f98fe64a-820d-49ff-a81f-479b34397500', 
      Description: formValues.Description,
      Title: formValues.Title,
      Link: formValues.Link,
      Img: 'https://images.pexels.com/photos/19736973/pexels-photo-19736973/free-photo-of-working-on-ipad-tablet-with-magic-keyboard.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      Interests: formValues.interests.map((item: any) => item.Value),
      SessionTime: sessionTime
    };

    this._userService.sessionCreate(sessionData).subscribe(
      (response: any) => {
        if (response.success==true) {
          this._toaster.success('Session created successfully');
          this._router.navigate(['/explore-page'])
        }
        else{
        this._toaster.error(response.message);
        }
      },
      (error: any) => {
        this._toaster.error(error.error.message || error.statusText);
      }
    )
  }
}
