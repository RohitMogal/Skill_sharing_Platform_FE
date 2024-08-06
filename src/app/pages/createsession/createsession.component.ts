import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DataServiceService } from '../../services/data-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-createsession',
  templateUrl: './createsession.component.html',
  styleUrls: ['./createsession.component.scss']
})
export class CreatesessionComponent implements OnInit {
  sessionForm: FormGroup | any;
  minDate: string | undefined;
  hours: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  minutes: number[] = Array.from({ length: 60 }, (_, i) => i);
  amPm: string[] = ['AM', 'PM'];
  dropdownData: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any[] = [];
  intrestListDropdown: any;
  sessionTime: any;
  base64Image: string | null = null;

  constructor(
    private _fb: FormBuilder,
    private _userService: DataServiceService,
    private _toaster: ToastrService,
    private _router: Router
  ) { }
  //Initializes the component.
  ngOnInit(): void {
    this.sessionForm = this._fb.group({
      Title: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      Link: new FormControl(null, Validators.required),
      Interests: new FormControl([], Validators.required),
      sessionTime: this.sessionTime,
      Img: new FormControl(null),
      date: new FormControl(null, Validators.required),
      hour: [null, Validators.required],
      minute: [null, Validators.required],
      period: [null, Validators.required],
      Amount: ['', [Validators.required, Validators.min(0)]]
    });
    this.initializeMinDate();
    this.initializeDropdown();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'ID',
      textField: 'Value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }
  //Initializes the minimum date for the date picker.
  initializeMinDate(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }
  //Initializes the dropdown settings for interests.
  initializeDropdown(): void {
    this._userService.dropDownIntrest().subscribe(
      (response: any) => {
        if (response.success) {
          this.dropdownData = response.data.map((element: any) => ({
            ID: element.id,
            Value: element.Interest
          }));
          this.dropdownSettings = {
            idField: 'ID',
            textField: 'Value',
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            itemsShowLimit: 10,
          };
        } else {
          this._toaster.error(response.message);
        }
      },
      (error: any) => {
        this._toaster.error(error.error.message);
      }
    );
  }
  //Submits the session form.
  onSubmit(): void {
    if (this.sessionForm.valid) {
      this.createSession();
    }
  }
  //Creates a new session.
  createSession() {
    const formValues = this.sessionForm.getRawValue();
    const date = formValues.date;
    const hour = formValues.hour;
    const minute = formValues.minute;
    const period = formValues.period;
    const timeString = `${date} ${hour}:${minute} ${period}`;
    const sessionTime = moment(timeString, 'YYYY-MM-DD h:mm A').format('YYYY-MM-DD HH:mm:ss');
    const payload = {
      ...formValues,
      Interests: formValues.Interests.map((item: any) => item.ID),
      sessionTime,
      Img: this.base64Image
    };
    this._userService.sessionCreate(payload).subscribe(
      (response: any) => {
        if (response.success) {
          this._toaster.success('Session created successfully');
          this._router.navigate(['/explore-page']);
        }
      },
      (error: any) => {
        this._toaster.error(error.error.message || error.statusText);
      }
    );
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result;
        this.sessionForm.patchValue({ Img: this.base64Image });
      };
      reader.readAsDataURL(file);
    }
  }
}
