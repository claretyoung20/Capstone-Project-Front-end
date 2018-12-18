import { ORDERCUSTOMERSDIALOG, ORDERSSTAFFDIALOG,
  TABLEDETAIL, EDITRESERVATIONDSTATUS, RESERVATIONSTATUTSPENDING,
  RESERVATIONSTATUTSCANCEL, RESERVATIONSTATUTsAPPROVE } from './../../static/constants/site.constants';
import { ViewDialogComponent } from './../order/viewDialog/viewDialog.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PaginationService } from 'app/shared/pagination/pagination.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CURRENTADMINROLE, STAFFROLE } from 'app/static/constants/site.constants';
import { ReservationService } from 'app/entities/services/reservation/reservation.service';
import { Reservation } from 'app/entities/interfaces/reservation';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { StaffService } from 'app/entities/services/staff/staff.service';
import { TableService } from 'app/entities/services/table/table.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  userRole: string;

   /* paganation */
   pageSize = 10;
   currentPage = 0;
   pager: any = {};
   totalItems: any = 0;

   dataSource;
   reservation: Reservation[] = [];
   displayedColumns: string[] = [
    'id',
    'time',
    'status',
    'bookTableId',
    'reserverDate',
    'updatedDate',
    'staff',
    'customer',
    'comment',
    'edit',
  ];

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private pagination: PaginationService,
    public dialog: MatDialog,
    private customerService: CustomerService,
    private staffServices: StaffService,
    private tableServices: TableService
  ) { }

  ngOnInit() {
      // chck if staff is logged in
      this.userRole = localStorage.getItem(CURRENTADMINROLE) || 'non';
      console.log('currently' + this.userRole);

      if (this.userRole === 'non' || this.userRole !== STAFFROLE) {
        this.router.navigate(['/admin/login']);
      }

      this.getAllReservation();
  }

  getAllReservation() {
      const query = {
          size: this.pageSize,
          page: this.currentPage
      };
    this.reservationService.getCurrentReervation(query).subscribe(res => {
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
    this.dataSource = new MatTableDataSource(res.content);
    this.reservation = res.content;
    this.totalItems = res.totalElements;
  }

  setPage(number) {
    this.currentPage = number;
    this.getAllReservation();
  }

  changePageSize(value) {
    console.log('Page size to show ' + value);
    this.pageSize = value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatus(time) {
    if (time === 'e') {
      return 'Evening';
    } else if (time === 'm') {
      return 'Morning'
    }
  }

  getStaffById(id) {
    this.staffServices.find(id).subscribe(res => {
      this.opendialog(res, ORDERSSTAFFDIALOG);
    });
  }

  getCustomerById(id) {
    this.customerService.find(id).subscribe(res => {
      this.opendialog(res, ORDERCUSTOMERSDIALOG);
    });
  }

  getTableId(id) {
    this.tableServices.find(id).subscribe(res => {
      this.opendialog(res, TABLEDETAIL);
    });
  }

  editReservation(id) {
    this.reservationService.find(id).subscribe(res => {
      this.opendialog(res, EDITRESERVATIONDSTATUS);
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
      this.getAllReservation();
    });
  }

  allReservation() {
    this.getAllReservation();
  }

  pendingReservation() {
      const query = {
          size: this.pageSize,
          page: this.currentPage
      };

    this.reservationService.getByStatus(RESERVATIONSTATUTSPENDING, query).subscribe(res => {
      this.processToShow(res);
    });
  }

  canceledReservation() {
      const query = {
          size: this.pageSize,
          page: this.currentPage
      };
    this.reservationService.getByStatus(RESERVATIONSTATUTSCANCEL, query).subscribe(res => {
      this.processToShow(res);
    });
  }

  approvedReservation() {
      const query = {
          size: this.pageSize,
          page: this.currentPage
      };
    this.reservationService.getByStatus(RESERVATIONSTATUTsAPPROVE, query).subscribe(res => {
      this.processToShow(res);
    });
  }
}
