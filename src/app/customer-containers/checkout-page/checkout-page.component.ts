import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {



  displayedColumns: string[] = ['dishId', 'name', 'price', 'edit', 'cancel'];

  dataSource;

  orders: {};
  /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllCustomer();
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  getAllCustomer() {
  }

  processToShow(res) {
  }

  setPage(number) {
    this.currentPage = number;
    this.getAllCustomer();
  }

  changePageSize(value) {
    console.log('Page size to show ' + value);
    this.pageSize = value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  viewCustomer(id) {
  }

  confirmCancel(id) {
  }
}


export interface PeriodicElement {
  name: string;
  dishId: string;
  price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {dishId: 'd01', name: 'Rice', price: 10.79},
  {dishId: 'd02', name: 'Rice', price: 10.79},
  {dishId: 'd03', name: 'Rice', price: 10.79},
  {dishId: 'd04', name: 'Rice', price: 10.79},
];
