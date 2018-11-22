import { ORDERVIEWSUBORDERDIALOG } from './../../static/constants/site.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from './../../entities/interfaces/order';
import { Customer } from './../../entities/interfaces/customer';
import { CustomerService } from './../../entities/services/customer/customer.service';
import { Coupon } from './../../entities/interfaces/coupon';
import { CouponService } from './../../entities/services/coupon/coupon.service';
import { PaginationService } from './../../shared/pagination/pagination.service';
import { OrderService } from './../../entities/services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CURRENTADMINROLE,
  STAFFROLE,
  ORDERSTATUSDIALOG,
  ORDERCUSTOMERSDIALOG,
  ORDERSSTAFFDIALOG,
  ORDERCOUPONDIALOG,
  ORDEREDITDIALOG
} from 'app/static/constants/site.constants';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StaffService } from 'app/entities/services/staff/staff.service';
import { Staff } from 'app/entities/interfaces/staff';
import { OrderStatus } from 'app/entities/interfaces/orderStatus';
import { OrderStatusService } from 'app/entities/services/orderStatus/orderStatus.service';
import { ViewDialogComponent } from './viewDialog/viewDialog.component';
import { SaleOrderService } from 'app/entities/services/saleOrder/sale-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  userRole: string;

  orders: Order[] = [];
  coupon: Coupon;
  customer: Customer;
  staff: Staff;
  orderStatus: OrderStatus;
  displayedColumns: string[] = [
    'id',
    'dateCreated',
    'dateUpdated',
    'totalPrice',
    'orderStatus',
    'customer',
    'coupon',
    'staff',
    'edit',
    'suborder'
  ];

  /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;

  dataSource;

  allOrderStatus: OrderStatus[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private orderService: OrderService,
    private pagination: PaginationService,
    private couponService: CouponService,
    private customerService: CustomerService,
    private staffServices: StaffService,
    private orderStatusService: OrderStatusService,
    private saleServices: SaleOrderService
  ) {}

  ngOnInit() {
    // chck if staff is logged in
    this.userRole = localStorage.getItem(CURRENTADMINROLE) || 'non';
    console.log('currently' + this.userRole);

    if (this.userRole === 'non' || this.userRole !== STAFFROLE) {
      this.router.navigate(['/admin/login']);
    }

    this. getAllOrderStatus();

    this.getAllOrder();
  }

  getAllOrder() {
    const query = {
      size: this.pageSize,
      page: this.currentPage
    };
    this.orderService.query(query).subscribe(res => {
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

  // get customer id
  getCustomerById(id) {
    this.customerService.find(id).subscribe(res => {
      this.opendialog(res, ORDERCUSTOMERSDIALOG);
    });
  }

  // get staff by id
  getStaffById(id) {
    this.staffServices.find(id).subscribe(res => {
      this.opendialog(res, ORDERSSTAFFDIALOG);
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

  editOrder(id) {
    this.orderService.find(id).subscribe(res => {
      this.opendialog(res, ORDEREDITDIALOG);
    });
  }

  viewSubOrder(id) {
    this.saleServices.getbyOrderId(id).subscribe(res => {
      this.opendialog(res, ORDERVIEWSUBORDERDIALOG);
    });
  }

  viewOrderByStatus(id) {
    this.orderService.getbyStatusId(id).subscribe(res => {
      this.processToShow(res)
    },
    (error: HttpErrorResponse) => {
      console.log('jjdjdjdj' + error.message);
    })
  }
  allOrder() {
    this.getAllOrder();
  }
}
