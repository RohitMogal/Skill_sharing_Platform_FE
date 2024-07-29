import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup | any;
  isEditMode: boolean = false;
  profile: any;

  constructor(private _fb: FormBuilder, private dataService: DataServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.profileForm = this._fb.group({
      name: ['', Validators.required],
      email: ['',
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ],
      aboutMe: ['', Validators.required],
      picture: ['', [Validators.required, Validators.pattern('(https?://.*.(?:png|jpg))')]]
    });
    this.loadProfile();
  }
  loadProfile() {
    this.dataService.getUserProfile().subscribe(data => {
      this.profileForm.patchValue(data);
      this.profileForm.get('email').disable(); 

    });
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.profileForm.get('email').disable(); 
    } else {
      this.profileForm.get('email').disable(); 
    }
  }
  onSubmit() {
    if (this.profileForm.valid) {
      this.dataService.updateUserProfile(this.profileForm.value).subscribe(response => {
        this.isEditMode = false;
      });
    }
  }

  onSave() {
    this.loadProfile();
    this.isEditMode = false;
  }

  onDiscard() {
    // this._router.navigate(['/profile'])
  }
}
