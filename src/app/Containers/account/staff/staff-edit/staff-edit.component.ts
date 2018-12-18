import { Component, OnInit } from '@angular/core';
import { User } from 'app/entities/interfaces/user';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'app/entities/services/staff/staff.service';
import { AccountStaffService } from 'app/entities/services/account/account.service';
import {OrderSucessComponent} from '../../../../customer-containers/checkout-page/order-sucess/order-sucess.component';
import {ErrorStaffDialogComponent} from '../error-staff-dialog/error-staff-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {

  user: User = {};
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private staffService: StaffService,
    private accountService: AccountStaffService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.user = {}

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.getStaffById(this.id);
      } else {
        // error handling
      }
    })
  }
  getStaffById(id) {
    this.accountService.findAccountById(id).subscribe(res => {
      this.user = res;
    });
  }
  save() {
    this.user.authorities = ['ROLE_STAFF']
    const data = this.user;
    console.log(this.user);
    if (this.user.id) {
      this.staffService.update(data).subscribe(res => {
        this.router.navigate(['admin/account/staff']);
      },
          () => {
        // open Dialog
              this.openErrorDialog();
          });
    } else {
      this.staffService.create(data).subscribe(res => {
        this.router.navigate(['admin/account/staff']);
      },
          () => {
              // open Dialog
              this.openErrorDialog();
          });
    }

  }

  openErrorDialog() {
      const dialogRef = this.dialog.open(ErrorStaffDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
      });
  }
}
