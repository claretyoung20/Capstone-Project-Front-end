import { Component, OnInit } from '@angular/core';
import { Customer } from 'app/entities/interfaces/customer';
import { Router } from '@angular/router';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { LOCALSTORAGEFORCUSTOMER } from 'app/static/constants/site.constants';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-customer-account',
  templateUrl: './edit-customer-account.component.html',
  styleUrls: ['./edit-customer-account.component.css']
})
export class EditCustomerAccountComponent implements OnInit {

  customerData: Customer;
  customerId: number;
  customerForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<EditCustomerAccountComponent>,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.customerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0');
    this.getCustomerById(this.customerId);
  }

  getCustomerById(id) {
    if (id !== 0) {
      console.log(id);
      this.customerService.find(id).subscribe((custumerData: Customer) => {
        this.pathValue(custumerData);
        this.customerData = custumerData;
        console.log(this.customerData);
      })
    } else {
      // return to home page
      this.router.navigate(['/login']);
    }

  }

  buildForm() {
    this.customerForm = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: ['', [Validators.required]],
      address: [''],
      email: [''],
      phoneNumber: [''],
      dateOfBirth: ['']
    })
  }

  pathValue(data) {
    this.customerForm.patchValue({
      id: data.id || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      address: data.address || '',
      email: data.email || '',
      phoneNumber: data.phoneNumber || '',
      dateOfBirth: data.dateOfBirth || '',
    });
  }

  upDateCustomer() {
    const oldData = this.customerData;
    const newData = this.customerForm.value;

    oldData.firstName = newData.firstName;
    oldData.lastName = newData.lastName;
    oldData.address = newData.address;
    oldData.email = newData.email;
    oldData.phoneNumber = newData.phoneNumber;
    oldData.status = newData.status;
    oldData.dateOfBirth = newData.dateOfBirth;

    this.customerService.update(oldData).subscribe(res => {
      this.dialogRef.close();
    })
  }

}
