import { LOCALSTORAGEFORUSERCUSTOMER } from './../../static/constants/site.constants';
import { AccountStaffService } from './../../entities/services/account/account.service';
import { AccountService } from './../../core/auth/account.service';
import { IUser } from './../../core/user/user.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditCustomerAccountComponent } from './edit-customer-account/edit-customer-account.component';
import { Customer, UserCustomer } from 'app/entities/interfaces/customer';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { LOCALSTORAGEFORCUSTOMER } from 'app/static/constants/site.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

   customerData: UserCustomer;
   customerId: number;
   userCustomerId: number;
   user: IUser
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private customerService: CustomerService,
    private accountService: AccountStaffService
  ) { }

  ngOnInit() {
    this.getCustomerById();
    this. getUseById();
  }

  getCustomerById() {
    this.customerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0');
    if (this.customerId !== 0) {
    console.log(this.customerId);
    this.customerService.find(this.customerId).subscribe((custumerData: UserCustomer) => {
     this.customerData = custumerData;
     console.log(this.customerData);
    })
  } else {
    // return to home page
    this.router.navigate(['/login']);
  }

  }

  getUseById() {
    this.userCustomerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORUSERCUSTOMER) || '0');
    this.accountService.findAccountById(this.userCustomerId).subscribe(res => {
      this.user = res;
    })
  }

  openEditProfile() {

    const dialogRef = this.dialog.open(EditCustomerAccountComponent, {
      data: {
        title: 'edit',
        resData: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getCustomerById()
    });

  }


}
