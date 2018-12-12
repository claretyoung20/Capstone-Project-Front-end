import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'app/entities/services/product/product.service';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent implements OnInit {
  show = false;
  id: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
      this.id = this.data.productId;
  }

  delete() {
    this.productService.delete(this.id).subscribe((res) =>
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
