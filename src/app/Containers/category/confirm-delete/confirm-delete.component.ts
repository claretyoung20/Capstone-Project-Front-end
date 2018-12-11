import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from 'app/entities/services/category/category.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  show = false;
  id: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
      this.id = this.data.categoryId;
  }

  delete() {
    this.categoryService.delete(this.id).subscribe((res) =>
      this.dialogRef.close(),
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
