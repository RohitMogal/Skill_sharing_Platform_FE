import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-createsession',
  templateUrl: './createsession.component.html',
  styleUrls: ['./createsession.component.css']
})
export class CreatesessionComponent implements OnInit {

  sessionForm: FormGroup;
  minDate!: string;
  hours: number[] = [];
  minutes: number[] = [];
  amPm: string[] = ['AM', 'PM'];
  dropdownData: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any[] = [];

  constructor(private fb: FormBuilder) {
    this.sessionForm = this.fb.group({
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
      console.log('Form Value', this.sessionForm.value);
      
    }
  }
}
