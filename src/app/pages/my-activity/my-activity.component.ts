import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from 'src/app/services/data-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackFormComponent } from 'src/app/pages/feedback-form/feedback-form.component';
@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.scss']
})
export class MyActivityComponent implements OnInit {
  createdSessionList: any = [];
  requestedSessionList: any = [];
  enrolledSessionList: any = [];
  attendedSessionList: any = [];
  SessionId: string | any;
  //Columns to display for created sessions table
  displayedColumnsCreated: any = ['srno',
    'title',
    'description',
  ];
  //Columns to display for requested sessions table
  displayedColumnsRequested: any = ['srno',
    'title',
    'description',
  ];
  //Columns to display for enrolled sessions table
  displayedColumnsEnrolled: any = ['srno',
    'title',
    'description',
  ];
  //Columns to display for attended sessions table
  displayedColumnsAttended: any = ['srno',
    'title',
    'description',
    'feedback'
  ];
  constructor(private _userService: DataServiceService, private _toster: ToastrService, private _router: Router, private _dialogRef: MatDialog) { }
  //API call to fetch user activity data
  ngOnInit(): void {
    this._userService.myActivity().subscribe((response: any) => {
      if (response.success) {
        this.createdSessionList = response.data.sessions;
        this.requestedSessionList = response.data.requests;
        this.enrolledSessionList = response.data.enrolments;
        this.attendedSessionList = response.data.pastsession;
      } else {
        this._toster.error(response.message);
      }
    }, (error) => {
      this._toster.error(error.error.message);
    });
  }
//Opens the feedback form dialog for a given session ID
  feedback(id: any) {
    const data = { sessionId: id }
    this._dialogRef.open(FeedbackFormComponent, { data: data });
  }
}
