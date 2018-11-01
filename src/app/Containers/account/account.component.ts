import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';

// customer
export interface CustomerElement {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

const ELEMENT_DATA: CustomerElement[] = [
  { id: 1, firstName: 'Young', lastName: 'Nnenna', email: 'claret@happ.com', status: 'active' },
  { id: 2, firstName: 'Young', lastName: 'Nnenna', email: 'claret@happ.com', status: 'active' },
  { id: 3, firstName: 'Young', lastName: 'Nnenna', email: 'claret@happ.com', status: 'active' },
  { id: 4, firstName: 'Young', lastName: 'Nnenna', email: 'claret@happ.com', status: 'active' },
  { id: 5, firstName: 'Young', lastName: 'Nnenna', email: 'claret@happ.com', status: 'active' }
];

// staff
export interface StaffElement {
  sid: number;
  sfirstName: string;
  scode: string;
  semail: string;
}

const ELEMENT_DATA_STAFF: StaffElement[] = [
  { sid: 1, sfirstName: 'Young', scode: 'SHH001', semail: 'claret@happ.com' },
  { sid: 2, sfirstName: 'Young', scode: 'SHH002', semail: 'claret@happ.com' },
  { sid: 3, sfirstName: 'Young', scode: 'SHH003', semail: 'claret@happ.com' },
  { sid: 4, sfirstName: 'Young', scode: 'SHH004', semail: 'claret@happ.com' },
  { sid: 5, sfirstName: 'Young', scode: 'SHH005', semail: 'claret@happ.com' }
];


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  // customer
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'status', 'edit', 'delete'];
  dataSource;

  // staff
  displayedColumnstaf: string[] = ['sid', 'sfirstName', 'scode', 'semail', 'edit', 'delete'];
  dataSourcestaff;

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSourcestaff = new MatTableDataSource(ELEMENT_DATA_STAFF);
  }
  // staff
  openStaff() {
    this.router.navigate(['admin/account/staff']);
  }

  applyFilterStaf(filterValue: string) {
    this.dataSourcestaff.filter = filterValue.trim().toLowerCase();
  }
  editStaff(id) {

  }
  deleteStaff(id) {

  }
  // customer
  openCustomer() {
    this.router.navigate(['admin/account/customer']);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editCustomer(id) {

  }
  deleteCustomer(id) {

  }
}
