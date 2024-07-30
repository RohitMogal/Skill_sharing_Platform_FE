import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from 'src/app/services/data-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-session',
  templateUrl: './request-session.component.html',
  styleUrls: ['./request-session.component.css']
})
export class RequestSessionComponent implements OnInit {
  // @Input() title: string = '';
  // @Input() description: string = '';
  requestForm: FormGroup | any;
  requestData: any;

  constructor(private _userService: DataServiceService, private _toastr: ToastrService, private _router: Router, private _fb: FormBuilder) {  this.requestForm = this._fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });
}

  ngOnInit(): void {
   
  }


  onSubmit() {
    if (this.requestForm.value) {
      this.requestMethod();

    }
  }

  requestMethod() {
    // const requestData = {
    //   title: this.requestForm.get('title').value,
    //   description: this.requestForm.get('description').value
    // };

    this._userService.requestSessions(this.requestForm.getRawValue()).subscribe((response: any) => {
      if (response.success) {
        this._toastr.success("Request Send successfully");

      }
    },
      (error: any) => {
        console.error('Error adding data:', error);
      });
    this._router.navigate(['/explore-page'])
  }
}