import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { User } from 'app/core';
import { StaffService } from 'app/entities/services/staff/staff.service';
import { PaginationService } from 'app/shared/pagination/pagination.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'activated', 'edit'];

    dataSource;
    user: User[] = [];
    /* paganation */
    pageSize = 10;
    currentPage = 0;
    pager: any = {};
    totalItems: any = 0;

  constructor(
    private router: Router,
    private staffService: StaffService,
    private pagination: PaginationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllStaffs();
  }

  getAllStaffs() {
    const query = {
      size: this.pageSize,
      page: this.currentPage
    }
    this.staffService.getAllStaff(query).subscribe(res => {
      this.processToShow(res);
    });
  }

  processToShow(res) {
    this.pager = this.pagination.getPager(this.currentPage, this.pageSize, res.totalElements);
    console.log('pager', this.pager);
    this.dataSource = new MatTableDataSource(res.content);
    this.user = res.content;
    this.totalItems = res.totalElements;
  }

  setPage(number) {
    this.currentPage = number;
    this.getAllStaffs();
  }

  changePageSize(value) {
    console.log('Page size to show ' + value);
    this.pageSize = value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  addNewStaff() {
    this.router.navigate(['admin/account/staff/add']);
  }
  editStaff(id) {
    this.router.navigate(['admin/account/staff/edit', id]);
  }
}
