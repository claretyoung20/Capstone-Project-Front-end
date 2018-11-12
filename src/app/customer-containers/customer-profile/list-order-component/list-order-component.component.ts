import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PaginationService } from 'app/shared/pagination/pagination.service';

@Component({
  selector: 'app-list-order-component',
  templateUrl: './list-order-component.component.html',
  styleUrls: ['./list-order-component.component.css']
})
export class ListOrderComponentComponent implements OnInit {


displayedColumns: string[] = ['orderId', 'name', 'price', 'status', 'edit', 'cancel'];

  dataSource;

  orders: {};
  /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;

  constructor(
    private router: Router,
    private pagination: PaginationService,
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
  orderId: string;
  price: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {orderId: '001', name: 'Rice', price: 10.79, status: 'Completed'},
  {orderId: '001', name: 'Rice', price: 10.79, status: 'Completed'},
  {orderId: '001', name: 'Rice', price: 10.79, status: 'Completed'},
  {orderId: '001', name: 'Rice', price: 10.79, status: 'Completed'},
];
