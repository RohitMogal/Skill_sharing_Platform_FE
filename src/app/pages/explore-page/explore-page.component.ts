import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit {
  @Input() session: any;
  isExpanded: boolean = false;
  selectedCategory: string = 'All Session';
  dialogBox: any;
  sessionsList: any = [];
  filteredSessionsList: any = [];
  userInterests: any = [];
  constructor(
    private _dialogRef: MatDialog,
    private _router: Router,
    private _userService: DataServiceService,
    private _toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchUserInterests();
    this._userService.getSessions().subscribe((response: any) => {
      if (response.success === true) {
        this.sessionsList = response.data;
        this.selectCategory();
      }
      else {
        this._toster.error(response.message);
      }
    }, (error) => {
      this._toster.error(error.error.message || error.statusText);
    });
  }

  fetchUserInterests(): void {
    this._userService.getUserInterests().subscribe((response: any) => {
      if (response.success === true) {
        this.userInterests = response.data;
      }
      else {
        this._toster.error(response.message);
      }
    }, (error) => {
      this._toster.error(error.error.message);
    });
  }

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
    this._router.navigate(['/course-detail']);
  }

  openProfileModal(): void {
    $('#profileModal').modal('show');
  }

  close() {
    $('#profileModal').modal('hide');
  }

  readMore() {
    this.dialogBox = this._dialogRef.open(CardDetailsComponent, { width: "50%" });
  }

  selectCategory(category?: any) {
    this.filteredSessionsList = [];
    if (category) {
      this.selectedCategory = category;
      this.sessionsList.forEach((element: any) => {
        if (JSON.parse(element.Interests).includes(category)) {
          this.filteredSessionsList.push(element);
        }
      });
    }
    else {
      this.filteredSessionsList = this.sessionsList;
    }
  }
}
