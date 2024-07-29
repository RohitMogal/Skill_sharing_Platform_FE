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
  userInterests: string[] = [];

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
        this.filterSessions();
      }
    }, (error) => {
      this._toster.error(error.error.message);
    });
  }

  fetchUserInterests(): void {
    this._userService.getUserInterests().subscribe((response: any) => {
      if (response.success === true) {
        this.userInterests = response.data;
        this.filterSessions();
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

  filterSessions() {
    let filteredList = this.sessionsList;
    if (this.selectedCategory !== 'All Session') {
      filteredList = filteredList.filter((session: any) => session.Category === this.selectedCategory);
    }
    const commonElements = filteredList.filter((session: any) => {
      const interestsArray = JSON.parse(session.Interests);
      return interestsArray.some((interest: string) => this.userInterests.includes(interest));
    });
    this.filteredSessionsList = commonElements;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterSessions();
  }
}
