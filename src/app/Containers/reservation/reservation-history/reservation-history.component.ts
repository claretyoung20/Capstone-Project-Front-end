import { Component, OnInit } from '@angular/core';
import {Reservation} from '../../../entities/interfaces/reservation';
import {Router} from '@angular/router';
import {ReservationService} from '../../../entities/services/reservation/reservation.service';
import {PaginationService} from '../../../shared/pagination/pagination.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {CustomerService} from '../../../entities/services/customer/customer.service';
import {StaffService} from '../../../entities/services/staff/staff.service';
import {TableService} from '../../../entities/services/table/table.service';
import {
    CURRENTADMINROLE,
    EDITRESERVATIONDSTATUS,
    ORDERCUSTOMERSDIALOG,
    ORDERSSTAFFDIALOG, RESERVATIONSTATUTsAPPROVE, RESERVATIONSTATUTSCANCEL, RESERVATIONSTATUTSPENDING,
    STAFFROLE,
    TABLEDETAIL
} from '../../../static/constants/site.constants';
import {ViewDialogComponent} from '../../order/viewDialog/viewDialog.component';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css']
})
export class ReservationHistoryComponent implements OnInit {


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
        'bookTable',
        'customer',
        'comment',
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
        this.reservationService.getHistoryReservation(query).subscribe(res => {
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
        this.dataSource = new MatTableDataSource(res);
        this.reservation = res;
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
        this.reservationService.getByStatus(RESERVATIONSTATUTSPENDING).subscribe(res => {
            this.processToShow(res);
        });
    }

    canceledReservation() {
        this.reservationService.getByStatus(RESERVATIONSTATUTSCANCEL).subscribe(res => {
            this.processToShow(res);
        });
    }

    approvedReservation() {
        this.reservationService.getByStatus(RESERVATIONSTATUTsAPPROVE).subscribe(res => {
            this.processToShow(res);
        });
    }
}
