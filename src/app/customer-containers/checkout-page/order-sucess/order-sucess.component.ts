import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-sucess',
  templateUrl: './order-sucess.component.html',
  styleUrls: ['./order-sucess.component.css']
})
export class OrderSucessComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderSucessComponent>,
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
