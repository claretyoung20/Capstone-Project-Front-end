import { ViewProductDetailComponent } from './../order/viewProductDetail/viewProductDetail.component';
import { PaginationService } from 'app/shared/pagination/pagination.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SaleOrder } from 'app/entities/interfaces/saleOrder';
import { SaleOrderService } from 'app/entities/services/saleOrder/sale-order.service';
import { CURRENTADMINROLE, STAFFROLE } from 'app/static/constants/site.constants';
import { ProductService } from 'app/entities/services/product/product.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  userRole: string;

   /* paganation */
   pageSize = 10;
   currentPage = 0;
   pager: any = {};
   totalItems: any = 0;

   dataSource;
   saleOrders: SaleOrder[] = [];
   displayedColumns: string[] = [
    'id',
    'basePrice',
    'dateCreated',
    'dateUpdated',
    'productId',
    'happyOrderId',
  ];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private saleOrdeService: SaleOrderService,
    private pagination: PaginationService,
    private productService: ProductService,
  ) { }


  ngOnInit() {
     // chck if staff is logged in
     this.userRole = localStorage.getItem(CURRENTADMINROLE) || 'non';
     console.log('currently' + this.userRole);

     if (this.userRole === 'non' || this.userRole !== STAFFROLE) {
       this.router.navigate(['/admin/login']);
     }

     this.getAllSales();
  }

  getAllSales() {  const query = {
    size: this.pageSize,
    page: this.currentPage
  };
  this.saleOrdeService.query(query).subscribe(res => {
    this.processToShow(res);
  });
}

processToShow(res) {
  this.pager = this.pagination.getPager(
    this.currentPage,
    this.pageSize,
    res.totalElements
  );
  console.log('pager', this.pager);
  console.log(res);
  this.dataSource = new MatTableDataSource(res);
  this.saleOrders = res;
  this.totalItems = res.totalElements;
}

setPage(number) {
  this.currentPage = number;
  this.getAllSales();
}

changePageSize(value) {
  console.log('Page size to show ' + value);
  this.pageSize = value;
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

getProductDetail(id) {
  // open new dialog
  this.productService.find(id).subscribe(res => {
    this.openPrdDeDialog(res);
  })
}

openPrdDeDialog(res) {
  console.log('hehehehe product id => ' + res);
  const dialogRef = this.dialog.open(ViewProductDetailComponent, {
    data: {
      resData: res,
    }
  });
}

getOrderById() {}

searchValue() {}

}
