import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { Router } from '@angular/router';
declare const $: any;
@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit {
  dialogBox: any;
  
  constructor(private _dialogRef: MatDialog, private _router: Router) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
