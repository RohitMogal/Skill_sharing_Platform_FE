import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.sessionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required],
      minute: ['', Validators.required],
      period: ['AM', Validators.required] // Default to 'AM'
    });

    // Initialize hours and minutes
    this.hours = Array.from({ length: 12 }, (_, i) => i + 1);
    this.minutes = Array.from({ length: 60 }, (_, i) => i);
  }

  ngOnInit(): void {
    this.initializeMinDate();
  }

  initializeMinDate(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.sessionForm.valid) {
      console.log('Form Value', this.sessionForm.value);
      // Add your form submission logic here
    }
  }
}
