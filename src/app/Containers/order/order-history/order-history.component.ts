import { Component, OnInit } from '@angular/core';
import {Order} from '../../../entities/interfaces/order';
import {Table} from '../../../entities/interfaces/table';
import {Coupon} from '../../../entities/interfaces/coupon';
import {Customer} from '../../../entities/interfaces/customer';
import {Staff} from '../../../entities/interfaces/staff';
import {OrderStatus} from '../../../entities/interfaces/orderStatus';
import {Router} from '@angular/router';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {OrderService} from '../../../entities/services/order/order.service';
import {PaginationService} from '../../../shared/pagination/pagination.service';
import {CouponService} from '../../../entities/services/coupon/coupon.service';
import {CustomerService} from '../../../entities/services/customer/customer.service';
import {StaffService} from '../../../entities/services/staff/staff.service';
import {OrderStatusService} from '../../../entities/services/orderStatus/orderStatus.service';
import {SaleOrderService} from '../../../entities/services/saleOrder/sale-order.service';
import {TableService} from '../../../entities/services/table/table.service';
import {
    CURRENTADMINROLE, ORDERCOUPONDIALOG,
    ORDERCUSTOMERSDIALOG, ORDEREDITDIALOG,
    ORDERSSTAFFDIALOG,
    ORDERSTATUSDIALOG, ORDERVIEWSUBORDERDIALOG,
    STAFFROLE,
    TABLEDETAIL
} from '../../../static/constants/site.constants';
import {ViewDialogComponent} from '../viewDialog/viewDialog.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

    userRole: string;

    orders: Order[] = [];
    table: Table;
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
        'bookTableId',
        'coupon',
        'staff',
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
        private saleServices: SaleOrderService,
        private tableService: TableService
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

    freezeTable(id) {
        // display dialog asking staff to freeze table
        this.tableService.find(id).subscribe( res => {
            this.opendialog(res, TABLEDETAIL);
        })
    }

    getAllOrder() {
        const query = {
            size: this.pageSize,
            page: this.currentPage
        };
        this.orderService.getHistoryOrder(query).subscribe(res => {
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

    filterStatus(id) {
        let item;
        for (item in this.allOrderStatus) {
            if (this.allOrderStatus[item].id === id) {
                return this.allOrderStatus[item].name;
            }
        }
    }

}

