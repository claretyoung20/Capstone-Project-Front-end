import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'app/entities/services/customer/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.customerForm = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: ['', [Validators.required]],
      address: [''],
      email: [''],
      phoneNumber: [''],
      status: [''],
      dateOfBirth: ['']
    })
  }

  addCustomer() {
    const data = this.customerForm.value;
    data.restaurantId = 1;
    this.customerService.create(data).subscribe(res => {
      this.router.navigate(['admin/account/customer']);
    });
  }

}
