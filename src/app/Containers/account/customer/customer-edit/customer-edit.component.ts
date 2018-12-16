import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, UserCustomer } from 'app/entities/interfaces/customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  id: any;
  customers: UserCustomer
  customerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.getCustomerById(this.id);
      } else {
        // error handling
      }
    })
  }

  getCustomerById(id) {
    console.log(id);
    this.customerService.find(id).subscribe((custumerData: UserCustomer) => {
      this.pathValue(custumerData);
      this.customers = custumerData
      console.log(custumerData);
    })

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

  pathValue(data) {
    this.customerForm.patchValue({
      id: data.id || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      address: data.address || '',
      email: data.email || '',
      phoneNumber: data.phoneNumber || '',
      status: data.status || false,
      dateOfBirth: data.dateOfBirth || '',
    });
  }

  editCustomer() {
    const oldData = this.customers;
    const newData = this.customerForm.value;

    this.customerService.update(oldData).subscribe(res => {
      this.router.navigate(['admin/account/customer']);
    })
  }
}
