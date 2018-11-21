import { Moment } from 'moment';
import { OrderService } from './../../../entities/services/order/order.service';
import { Coupon } from './../../../entities/interfaces/coupon';
import { User } from 'app/entities/interfaces/user';
import { Customer } from 'app/entities/interfaces/customer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {
  ORDERSTATUSDIALOG,
  ORDERCUSTOMERSDIALOG,
  ORDERSSTAFFDIALOG,
  ORDERCOUPONDIALOG,
  ORDEREDITDIALOG
} from 'app/static/constants/site.constants';
import { OrderStatus } from 'app/entities/interfaces/orderStatus';
import { identifierModuleUrl } from '@angular/compiler';
import { UserService } from 'app/core';
import { Staff } from 'app/entities/interfaces/staff';
import { Order } from 'app/entities/interfaces/order';

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

  user: User;
  staff: Staff;
  isStaff = false;

  coupon: Coupon;
  isCoupon = false;

  order: Order;
  isEditStatus = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userservice: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    if (this.data.title === ORDERSTATUSDIALOG) {
      this.orderStatus = this.data.resData;
      this.isOrderStatus = true;
    }
    if (this.data.title === ORDERCUSTOMERSDIALOG) {
      this.customer = this.data.resData;
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
  }

  updateOrder(statusId, staffId) {
    const data = this.order;
    data.staffId = staffId;
    data.orderStatusId = statusId;
    this.orderService.update(data).subscribe(res => {
      console.log(res);
    });
  }
}
