import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { Customer } from 'app/entities/interfaces/customer';
import { PaginationService } from 'app/shared/pagination/pagination.service';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { ConformDeleteDialogComponent } from './conform-delete-dialog/conform-delete-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dateOfBirth', 'address', 'phoneNumber',
    'email', 'status', 'edit', 'delete'];

  dataSource;

  customers: Customer[] = [];
  /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private pagination: PaginationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllCustomer();
  }

  getAllCustomer() {
    const query = {
      size: this.pageSize,
      page: this.currentPage
    }
    this.customerService.query(query).subscribe(res => {
      this.processToShow(res);
    });
  }

  processToShow(res) {
    this.pager = this.pagination.getPager(this.currentPage, this.pageSize, res.totalElements);
    console.log('pager', this.pager);
    this.dataSource = new MatTableDataSource(res);
    this.customers = res;
    this.totalItems = res.totalElements;
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

  // open dialog for add, edit and delete
  addNewCustomer() {
    this.router.navigate(['admin/account/customer/add/']);
  }

  editCustomer(id) {
    this.router.navigate(['admin/account/customer/edit/', id]);
  }

  confirmDelete(id) {
    const title = 'Delete';
    const dialogRef = this.dialog.open(ConformDeleteDialogComponent, {
      data: {
        customerId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllCustomer();
    });

  }
}
