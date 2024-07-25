import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  constructor(private _dialog: MatDialog, public dialogRef: MatDialogRef<CardDetailsComponent>) { }
  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
