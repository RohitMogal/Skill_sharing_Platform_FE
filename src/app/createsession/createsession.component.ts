import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DataServiceService } from '../services/data-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-createsession',
  templateUrl: './createsession.component.html',
  styleUrls: ['./createsession.component.css']
})
export class CreatesessionComponent implements OnInit {
  sessionForm: FormGroup | any;
  minDate!: string;
  hours: number[] = [];
  minutes: number[] = [];
  amPm: string[] = ['AM', 'PM'];
  dropdownData: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any[] = [];

  constructor(private _fb: FormBuilder, private _userService: DataServiceService, private _toaster: ToastrService, private _router: Router) {
    this.sessionForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
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
  //Date Logic
  initializeMinDate(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }
  //DropDown Logic
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
  //call when form submit
  onSubmit(): void {
    if (this.sessionForm.valid) {
      this.createSession();
      console.log('Form Value', this.sessionForm.value);
    }
  }
  //Create session Logic
  createSession() {
    this._userService.sessionCreate(this.sessionForm.getRawValue()).subscribe(
      (response: any) => {
        if (response) {
          this._userService.token = response.token;
          this._userService.getSessions().subscribe();
          this._toaster.success("Session created successfully");
          this._router.navigate(['/home']);
        }
      },
      (error: any) => {
        this._toaster.error("Created session failed");
      }
    );
  }
}
