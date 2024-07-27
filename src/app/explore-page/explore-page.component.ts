import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { CourseDetailComponent } from '../pages/course-detail/course-detail.component';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit {
  dialogBox: any;
  sessionsList:any=[];
  constructor(private _dialogRef: MatDialog, private _router: Router, private _userService:DataServiceService, private _toster:ToastrService) {
  }
  ngOnInit(): void {
    this._userService.getSessions().subscribe((response:any)=>{
      if(response.success==true){
        this.sessionsList=response.data;
      }
    },(error)=>{
      this._toster.error(error.error.message);
    });
  }
//Profile detail popup logic
  openProfileModal(): void {
    $('#profileModal').modal('show');
  }
  close() {
    $('#profileModal').modal('hide');
  }
  //Read more logic
  readMore() {
    this.dialogBox = this._dialogRef.open(CardDetailsComponent, { width: "50%" });
  }

}
