import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { OrderService } from 'app/entities/services/order/order.service';
import { Order } from 'app/entities/interfaces/order';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent implements OnInit {

  show = false;
  id: any;
  order: Order;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CancelOrderComponent>,
    private orderService: OrderService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
      this.id = this.data.orderId;
      if (this.id !== null) {
        this.getOrderId(this.id);
      }
  }

  getOrderId(id) {
    this.orderService.find(id).subscribe( res => {
      this.order = res;
    })
  }

  cancelOrder() {
    this.order.orderStatusId = 4;
    this.orderService.update(this.order).subscribe((res) =>
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
