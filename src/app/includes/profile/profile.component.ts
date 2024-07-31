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
  profileForm: FormGroup|any;
  isEditMode: boolean = false;

  constructor(private _fb: FormBuilder, private dataService: DataServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.profileForm = this._fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      about: ['', Validators.required],
      profilePicture: ['']
    });
    this.loadProfile();
  }

  loadProfile() {
    this.dataService.getUserProfile().subscribe(data => {
      this.profileForm.patchValue({
        fullName:data.data[0].fullName,
        email:data.data[0].email,
        about:data.data[0].about,
        profilePicture:data.data[0].profilePicture
      });
      this.profileForm.get('email').disable(); 
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.profileForm.get('email').disable();
    } else {
      this.profileForm.get('email').disable(); 
    }
  }
  onSubmit() {
    if (this.profileForm.valid) {
      this.dataService.updateUserProfile(this.profileForm.value).subscribe(response => {
        this.isEditMode = false;
        this.loadProfile(); 
      });
    }
  }
  onSave() {
    if (this.profileForm.valid) {
      this.onSubmit();
    }
  }
  onDiscard() {
    if (confirm('Are you sure you want to discard the changes?')) {
      this.loadProfile();
      this.isEditMode = false;
    }
  }
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileForm.get('profilePicture').setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
