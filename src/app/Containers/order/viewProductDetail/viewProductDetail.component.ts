import { Product } from './../../../entities/interfaces/product';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-product-petail',
  templateUrl: './viewProductDetail.component.html',
  styleUrls: ['./viewProductDetail.component.css']
})
export class ViewProductDetailComponent implements OnInit {

  product: Product;
  constructor(
    public dialogRef: MatDialogRef<ViewProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    if (this.data.resData) {
      this.product = this.data.resData;
    }
  }

}
