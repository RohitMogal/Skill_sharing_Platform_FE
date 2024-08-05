import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss']
})
export class ExplorePageComponent implements OnInit {
  //Input property to receive the current session from the parent component.
  @Input() session: any;
  isExpanded: boolean = false;
  selectedCategory: string = 'All Session';
  selectedCategoryReq: string = 'All Session';
  dialogBox: any;
  sessionsList: any = [];
  filteredSessionsList: any = [];
  requestSessionList: any = [];
  filteredReqSessionsList: any = [];
  userInterests: any = [];
  amount: string | any;
  SessionId: string | any;

  constructor(
    private _dialogRef: MatDialog,
    private _router: Router,
    private _userService: DataServiceService,
    private _toster: ToastrService,
    private route: ActivatedRoute
  ) { }
  //Initializes the component by fetching user interests, sessions, and request sessions.
  ngOnInit(): void {
    this.fetchUserInterests();
    this.sessionRequest();
    this.requestSessionMethod();
  }
  //Fetches sessions from the data service.
  sessionRequest() {
    this._userService.getSessions().subscribe((response: any) => {
      if (response.success === true) {
        this.sessionsList = response.data;
        this.selectCategory();
      }
      else {
        this._toster.error(response.message);
      }
    }, (error: any) => {
      this._toster.error(error.error.message || error.statusText);
    });
  }
  //Fetches user interests from the data service.
  fetchUserInterests(): void {
    this._userService.getInterests().subscribe((response: any) => {
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
  //Fetches request sessions from the data service.
  requestSessionMethod() {
    this._userService.getRequestSession().subscribe((response: any) => {
      if (response.success === true) {
        this.requestSessionList = response.data;
        this.selectCategoryReq();
      }
      else {
        this._toster.error(response.message);
      }
    }, (error) => {
      this._toster.error(error.error.message || error.statusText);
    });
  }
  //Filters request sessions based on the selected category.
  selectCategoryReq(category?: any) {
    this.filteredSessionsList = [];
    if (category) {
      this.selectedCategoryReq = category;
      this.requestSessionList.forEach((element: any) => {
        if (element.Interests.includes(category)) {
          this.filteredReqSessionsList.push(element);
        }
      });
    }
    else {
      this.filteredReqSessionsList = this.requestSessionList;
    }
  }
  //Filters sessions based on the selected category.
  selectCategory(category?: any) {
    this.filteredSessionsList = [];
    if (category) {
      this.selectedCategory = category;
      this.sessionsList.forEach((element: any) => {
        if (element.Interests.includes(category)) {
          this.filteredSessionsList.push(element);
        }
      });
    }
    else {
      this.filteredSessionsList = this.sessionsList;
    }
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

}
