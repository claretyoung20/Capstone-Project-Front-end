import { ICoupon } from './../../../entities/interfaces/iCoupon';
import { Coupon } from './../../../entities/interfaces/coupon';
import { Router } from '@angular/router';
import { CouponService } from './../../../entities/services/coupon/coupon.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PromotionDialogComponent } from './../promotion-dialog/promotion-dialog.component';
import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'app/shared/pagination/pagination.service';

@Component({
  selector: 'app-promotion-history',
  templateUrl: './promotion-history.component.html',
  styleUrls: ['./promotion-history.component.css']
})
export class PromotionHistoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'code', 'startFromDate', 'endDate', 'noPerUser',
  'maxAmountToApply', 'isActive', 'action'];

  dataSource;
  coupon: ICoupon[] = [];
  /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;

  constructor(
    private router: Router,
    private couponService: CouponService,
    private pagination: PaginationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    const query = {
      size: this.pageSize,
      page: this.currentPage
    }
    this.couponService.query(query).subscribe(res => {
      this.processToShow(res);
    });
  }

  processToShow(res) {
    this.pager = this.pagination.getPager(this.currentPage, this.pageSize, res.totalElements);
    console.log('pager', this.pager);
    console.log(res);
    this.dataSource = new MatTableDataSource(res);
    this.coupon = res;
    this.totalItems = res.totalElements;
  }

  setPage(number) {
    this.currentPage = number;
    this.getAllProduct();
  }

  changePageSize(value) {
    console.log('Page size to show ' + value);
    this.pageSize = value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmDelete(id) {
    const title = 'Delete';
    const dialogRef = this.dialog.open(PromotionDialogComponent, {
      data: {
        productId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllProduct();
    });

  }

  deleteCoupon(id) {
    this.confirmDelete(id);
  }

}
