import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { TableService } from 'app/entities/services/table/table.service';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.css']
})
export class TableDialogComponent implements OnInit {
  show = false;
  id: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TableDialogComponent>,
    public dialog: MatDialog,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.id = this.data.tableId;
  }
  delete() {
    this.tableService.delete(this.id).subscribe(
      res => this.dialogRef.close(),
      (res: HttpErrorResponse) => {
        this.show = true;
      }
    );
  }
  cancel() {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
}
