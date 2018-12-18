import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-error-staff-dialog',
  templateUrl: './error-staff-dialog.component.html',
  styleUrls: ['./error-staff-dialog.component.css']
})
export class ErrorStaffDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ErrorStaffDialogComponent>,
  ) { }

  ngOnInit() {
  }

  close() {
        this.dialogRef.close();
    }
}
