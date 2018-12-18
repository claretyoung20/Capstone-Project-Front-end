import { LOCALSTORAGEFORCUSTOMER } from './../../../static/constants/site.constants';
import { Router } from '@angular/router';
import { ProductService } from 'app/entities/services/product/product.service';
import { OrderStatusService } from './../../../entities/services/orderStatus/orderStatus.service';
import { OrderService } from './../../../entities/services/order/order.service';
import { Coupon } from './../../../entities/interfaces/coupon';
import { User } from 'app/entities/interfaces/user';
import { Customer } from 'app/entities/interfaces/customer';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {
  ORDERSTATUSDIALOG,
  ORDERCUSTOMERSDIALOG,
  ORDERSSTAFFDIALOG,
  ORDERCOUPONDIALOG,
  ORDEREDITDIALOG,
  CURRENTSTAFFORADMINID,
  ORDERVIEWSUBORDERDIALOG,
  TABLEDETAIL,
  EDITRESERVATIONDSTATUS
} from 'app/static/constants/site.constants';
import { OrderStatus } from 'app/entities/interfaces/orderStatus';
import { Staff } from 'app/entities/interfaces/staff';
import { Order } from 'app/entities/interfaces/order';
import { StaffService } from 'app/entities/services/staff/staff.service';
import { SaleOrder } from 'app/entities/interfaces/saleOrder';
import { ViewProductDetailComponent } from '../viewProductDetail/viewProductDetail.component';
import { Table } from 'app/entities/interfaces/table';
import { Reservation } from 'app/entities/interfaces/reservation';
import { ReservationService } from 'app/entities/services/reservation/reservation.service';
import { TableType } from 'app/entities/interfaces/tableType';
import { TableTypeService } from 'app/entities/services/tableType/table-type.service';
import {TableService} from '../../../entities/services/table/table.service';
import {UserService} from '../../../entities/model/user/user.service';
import {AccountService} from '../../../core';
import {AccountStaffService} from '../../../entities/services/account/account.service';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './viewDialog.component.html',
  styleUrls: ['./viewDialog.component.css']
})
export class ViewDialogComponent implements OnInit {
  orderStatus: OrderStatus;
  isOrderStatus = false;

  customer: Customer;
  isCustomer = false;

  tableTypes: TableType[] = [];

  user: User;
  staff: Staff;
  isStaff = false;

  coupon: Coupon;
  isCoupon = false;

  order: Order;
  isEditStatus = false;

  customerId = 0;

  // order status
  statusOrder: OrderStatus[] = [];

  // update form
  updateForm: FormGroup;
  // current user id
  userId: number;
  customerUserId: number

  // user details
  userDetail: User;

  // sub orer
  // data source
  dataSource;
  displayedColumns: string[] = ['id', 'basePrice', 'productId'];
  isSubOrder = false;
  subOrders: SaleOrder[] = [];

  // table detail
  table: Table;
  isTableFreeze = false;
  isTable = false;

  //  UPDATE RESVERSATION
  reservation: Reservation;
  isEditReservation = false;
  reserveForm: FormGroup;

  statusReserve: Status[] = [
    {value: 'pending', name: 'pending'},
    {value: 'cancel', name: 'cancel'},
    {value: 'approved', name: 'approved'},
    {value: 'complete', name: 'complete'}
  ];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userservice: AccountStaffService,
    private orderService: OrderService,
    private orderStatusService: OrderStatusService,
    private staffService: StaffService,
    private router: Router,
    public dialog: MatDialog,
    private productSErvice: ProductService,
    private reserveService: ReservationService,
    private tableTypeService: TableTypeService,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.user = {};
    // get current staff Id
    this.userId = JSON.parse(localStorage.getItem(CURRENTSTAFFORADMINID) || '0');
    this.customerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0');
    if (this.data.title === ORDERSTATUSDIALOG) {
      this.orderStatus = this.data.resData;
      this.isOrderStatus = true;
    }
    if (this.data.title === ORDERCUSTOMERSDIALOG) {
      this.customer = this.data.resData;
      this.customerUserId = this.customer.userId;
        this.getUserByCustomerUserId();
      this.isCustomer = true;
    }
    if (this.data.title === ORDERSSTAFFDIALOG) {
      this.staff = this.data.resData;
      this.isStaff = true;
    }
    if (this.data.title === ORDERCOUPONDIALOG) {
      this.coupon = this.data.resData;
      this.isCoupon = true;
    }
    if (this.data.title === ORDEREDITDIALOG) {
      this.order = this.data.resData;
      this.isEditStatus = true;
    }
    if (this.data.title === ORDERVIEWSUBORDERDIALOG) {
      this.subOrders = this.data.resData;
      this.isSubOrder = true;
      this.dataSource = new MatTableDataSource(this.subOrders);
    }
    if (this.data.title === TABLEDETAIL) {
      this.table = this.data.resData;
      this.isTable = true;
    }
    if (this.data.title === EDITRESERVATIONDSTATUS) {
      this.reservation = this.data.resData;
      this.isEditReservation = true;
    }


    this.buildForm();
    this.buildForm1();
    this.getAllOrderStatus();
    this.getAllTableTypess();

  }

  getAllTableTypess() {
    this.tableTypeService.findAll().subscribe(res => {
      this.processToShowTableTypes(res);
    });
  }
  processToShowTableTypes(res) {
    this.tableTypes = res;
  }
  updateOrder(staffId) {
    if (this.userId !== 0) {
      const formData = this.updateForm.value;
      const data = this.order;
      data.staffId = staffId;
      // use this User id to get staff id
      data.orderStatusId = formData.id;
      this.orderService.update(data).subscribe(res => {
        console.log(res);
      });
    }
    this.dialogRef.close();
  }

  getAllOrderStatus() {
    this.orderStatusService.findAll().subscribe(res => {
      this.showStatusdata(res);
    });
  }
  showStatusdata(res) {
    this.statusOrder = res;
  }

  cancel() {
    this.dialogRef.close();
  }

  buildForm() {
    this.updateForm = this.fb.group({
      id: ['']
    });
  }

  freeze() {
    this.table.isAvaliable = false;
    this.tableService.update(this.table).subscribe( res => {
      this.dialogRef.close();
    })
  }

  Unfreeze() {
        this.table.isAvaliable = true;
        this.tableService.update(this.table).subscribe( res => {
            this.dialogRef.close();
        })
    }
  pathValue(data) {
    this.updateForm.patchValue({
      id: data.id || ''
    });
  }

  // get staff id
  getStaffId() {
    this.staffService.getStaffbyUserId(this.userId).subscribe(res => {
      this.updateOrder(res.id);
    })
  }

  getUserDetail() {
    /// this.userservice.
  }

  // sub order
  viewAllSubOrder() {
    this.router.navigate(['/admin/statistics']);
    this.dialogRef.close();
  }

  getProductDetail(id) {
    // open new dialog
    this.productSErvice.find(id).subscribe(res => {
      this.openPrdDeDialog(res);
    })
  }

  getTableType(id) {
    let types;
    for (types in this.tableTypes) {
      if (this.tableTypes[types].id === id) {
          return this.tableTypes[types].description;
      }
    }
    return 'Null';
  }

  openPrdDeDialog(res) {
    console.log('hehehehe product id => ' + res);
    const dialogRef = this.dialog.open(ViewProductDetailComponent, {
      data: {
        resData: res,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // update reservation
  buildForm1() {
    this.reserveForm = this.fb.group({
      status: [this.statusReserve[0]],
      comment: [null]
    });
  }

  pathValue1(data) {
    this.reserveForm.patchValue({
      status: data.id || ''
    });
  }

  getResrvation() {
    this.staffService.getStaffbyUserId(this.userId).subscribe(res => {
      this.updateReserve(res.id);
    })
  }

  updateReserve(staffId) {
    if (this.userId !== 0) {
      const formData = this.reserveForm.value;
      const data = this.reservation;
       // use this User id to get staff id
      data.staffId = staffId;
      data.comment = formData.comment;
      data.status = formData.status;
      this.reserveService.update(data).subscribe(res => {
        console.log(res);
      });
    }
    this.dialogRef.close();
  }


  getUserByCustomerUserId() {
        this.userservice.findAccountById(this.customerUserId).subscribe( res => {
          this.user = res;
        })
    }
}


export interface Status {
  value: string;
  name: string;
}
