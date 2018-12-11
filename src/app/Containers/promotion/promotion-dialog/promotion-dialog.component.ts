import { HttpErrorResponse } from '@angular/common/http';
import { CouponService } from './../../../entities/services/coupon/coupon.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-promotion-dialog',
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.css']
})
export class PromotionDialogComponent implements OnInit {
  show = false;
  id: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PromotionDialogComponent>,
    public dialog: MatDialog,
    private couponService: CouponService
  ) { }

  ngOnInit() {
    this.id = this.data.couponId;
  }
  delete() {
    this.couponService.delete(this.id).subscribe((res) =>
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
