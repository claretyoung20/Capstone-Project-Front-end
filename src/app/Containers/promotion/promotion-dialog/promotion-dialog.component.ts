import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-promotion-dialog',
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.css']
})
export class PromotionDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PromotionDialogComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

}
