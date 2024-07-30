import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.css']
})
export class MyActivityComponent implements OnInit {
  activityList: any;
  userInterestsList: any;
  userRequestSessionList: any;

  constructor(private _userService: DataServiceService, private _toster: ToastrService) { }

  ngOnInit(): void {
    this.myInterestedSession();
    this.requestSessionList();
    this._userService.myActivity().subscribe((response: any) => {
      if (response.success) {
        this.activityList = response.data;
      } else {
        this._toster.error(response.message);
      }
    }, (error) => {
      this._toster.error(error.error.message);
    });
  }

  // Session list API
  requestSessionList() {
    this._userService.requestSessionsList().subscribe((response: any) => {
      if (response.success) {
        this.userRequestSessionList = response.data;
      } else {
        this._toster.error(response.message);
      }
    }, (error) => {
      this._toster.error(error.error.message);
    });
  }

  // Interest List API
  myInterestedSession() {
    this._userService.myInterestedList().subscribe((response: any) => {
      if (response.success) {
        this.userInterestsList = response.data;
      } else {
        this._toster.error(response.message);
      }
    }, (error) => {
      this._toster.error(error.error.message);
    });
  }
}
