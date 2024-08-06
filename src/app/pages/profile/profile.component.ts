import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup | any;
  isEditMode: boolean = false;

  constructor(private _fb: FormBuilder, private dataService: DataServiceService, private _router: Router) { }
  //Initializes the profile form and loads the user's profile information.
  ngOnInit(): void {
    this.profileForm = this._fb.group({
      //Validations
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      about: ['', Validators.required],
      profilePicture: ['']
    });
    this.loadProfile();
  }
  //Loads the user's profile information from the data service.
  loadProfile() {
    this.dataService.getUserProfile().subscribe(data => {
      this.profileForm.patchValue({
        fullName: data.data[0].fullName,
        email: data.data[0].email,
        about: data.data[0].about,
        profilePicture: data.data[0].profilePicture
      });
      this.profileForm.get('email').disable();
    });
  }

  //Toggles the edit mode flag and enables/disables the email field.
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.profileForm.get('email').disable();
  }
  //Submits the profile form and updates the user's profile information.
  onSubmit() {
    if (this.profileForm.valid) {
      this.dataService.updateUserProfile(this.profileForm.value).subscribe(response => {
        this.isEditMode = false;
        this.loadProfile();
      });
    }
  }
  //Discards the changes made to the profile form and reloads the user's profile information.
  onDiscard() {
    if (confirm('Are you sure you want to discard the changes?')) {
      this.loadProfile();
      this.isEditMode = false;
    }
  }
  //Uploads an image and updates the profile picture field.
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
