import { LOCALSTORAGEFORCUSTOMER } from 'app/static/constants/site.constants';
import { Customer } from 'app/entities/interfaces/customer';
import { ViewDialogComponent } from './../../../../Containers/order/viewDialog/viewDialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ORDERVIEWSUBORDERDIALOG, ORDERSTATUSDIALOG, ORDERCOUPONDIALOG } from './../../../../static/constants/site.constants';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CouponService } from './../../../../entities/services/coupon/coupon.service';
import { Coupon } from './../../../../entities/interfaces/coupon';
import { Order } from './../../../../entities/interfaces/order';
import { Component, OnInit } from '@angular/core';
import { Staff } from 'app/entities/interfaces/staff';
import { OrderStatus } from 'app/entities/interfaces/orderStatus';
import { OrderService } from 'app/entities/services/order/order.service';
import { PaginationService } from 'app/shared/pagination/pagination.service';
import { OrderStatusService } from 'app/entities/services/orderStatus/orderStatus.service';
import { SaleOrderService } from 'app/entities/services/saleOrder/sale-order.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.css']
})
export class HistoryOrderComponent implements OnInit {

  orders: Order[] = [];
  coupon: Coupon;
  customer: Customer;
  staff: Staff;
  orderStatus: OrderStatus;
  customerId: number;
  displayedColumns: string[] = [
    'id',
    'dateCreated',
    'dateUpdated',
    'totalPrice',
    'orderStatus',
    'coupon',
    'suborder'
  ];
  dataSource;

  /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;

  allOrderStatus: OrderStatus[] = []
  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private pagination: PaginationService,
    private couponService: CouponService,
    private orderStatusService: OrderStatusService,
    private saleServices: SaleOrderService
  ) { }

  ngOnInit() {
    this.customerId = JSON.parse(
      localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0'
    );
    this. getAllOrderStatus();

    this.getAllOrder();
  }

  getAllOrder() {
    this.orderService.getOrderHistory(this.customerId).subscribe(res => {
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
    this.orders = res;
    this.totalItems = res.totalElements;
  }

  setPage(number) {
    this.currentPage = number;
    this.getAllOrder();
  }
  changePageSize(value) {
    console.log('Page size to show ' + value);
    this.pageSize = value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // get order status
  getOrderStatus(id) {
    this.orderStatusService.find(id).subscribe(res => {
      this.opendialog(res, ORDERSTATUSDIALOG);
    });
  }

  // get coupon by id
  getCouponById(id) {
    this.couponService.find(id).subscribe(res => {
      this.opendialog(res, ORDERCOUPONDIALOG);
    });

  }

  opendialog(res, title) {
    const dialogRef = this.dialog.open(ViewDialogComponent, {
      data: {
        resData: res,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllOrder();
    });
  }

  //  get all status
  getAllOrderStatus() {
    const query = {};
    this.orderStatusService.query(query).subscribe(res => {
     this.showStatusbutton(res);
    });
  }
  showStatusbutton(res) {
    this.allOrderStatus = res;
  }

  viewSubOrder(id) {
    this.saleServices.getbyOrderId(id).subscribe(res => {
      this.opendialog(res, ORDERVIEWSUBORDERDIALOG);
    });
  }


  filterStatus(id) {
    let item;
   for (item in this.allOrderStatus) {
     if (this.allOrderStatus[item].id === id) {
        return this.allOrderStatus[item].name;
     }
   }
  }
}
