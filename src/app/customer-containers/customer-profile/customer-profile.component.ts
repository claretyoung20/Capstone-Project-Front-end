import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditCustomerAccountComponent } from './edit-customer-account/edit-customer-account.component';
import { Customer } from 'app/entities/interfaces/customer';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { LOCALSTORAGEFORCUSTOMER } from 'app/static/constants/site.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

   customerData: Customer;
   customerId: number;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomerById();
  }

  getCustomerById() {
    this.customerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0');
    if (this.customerId !== 0) {
    console.log(this.customerId);
    this.customerService.find(this.customerId).subscribe((custumerData: Customer) => {
     this.customerData = custumerData;
     console.log(this.customerData);
    })
  } else {
    // return to home page
    this.router.navigate(['/login']);
  }

  }


  openEditProfile() {

    const dialogRef = this.dialog.open(EditCustomerAccountComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getCustomerById()
    });

  }


}
