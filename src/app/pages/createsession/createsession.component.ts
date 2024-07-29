// src/app/components/createsession/createsession.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DataServiceService } from '../../services/data-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createsession',
  templateUrl: './createsession.component.html',
  styleUrls: ['./createsession.component.css']
})
export class CreatesessionComponent implements OnInit {
  sessionForm: FormGroup;
  minDate: any;
  hours: number[] = [];
  minutes: number[] = [];
  amPm: string[] = ['AM', 'PM'];
  dropdownData: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: DataServiceService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.sessionForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Link: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required],
      minute: ['', Validators.required],
      period: ['AM', Validators.required],
      myItems: [this.selectedItems]
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
      { ID: 1, Value: 'Data1' },
      { ID: 2, Value: 'Data2' },
      { ID: 3, Value: 'Data3' },
      { ID: 4, Value: 'Data4' },
      { ID: 5, Value: 'Data5' }
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
  }

  createSession(): void {
    const formValues = this.sessionForm.getRawValue();
    const sessionTime = new Date(`${formValues.date} ${formValues.hour}:${formValues.minute} ${formValues.period}`).toISOString();

    const sessionData = {
      UserId: 'f98fe64a-820d-49ff-a81f-479b34397500', 
      Description: formValues.Description,
      Title: formValues.Title,
      Link: formValues.Link,
      Img: 'https://images.pexels.com/photos/19736973/pexels-photo-19736973/free-photo-of-working-on-ipad-tablet-with-magic-keyboard.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      Interests: formValues.myItems.map((item: any) => item.Value).toString(),
      SessionTime: sessionTime
    };

    this.userService.sessionCreate(sessionData).subscribe(
      (response: any) => {
        if (response) {
          this.toaster.success('Session created successfully');
          this.router.navigate(['/home']);
        }
      },
      (error: any) => {
        this.toaster.error('Failed to create session');
      }
    );
  }
}
