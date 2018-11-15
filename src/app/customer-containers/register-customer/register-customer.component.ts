import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'app/entities/services/customer/customer.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {

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
      dateOfBirth: [''],
      password: ['']
      // passwordConfirm: ['']
    })
  }
  addCustomer() {
    const data = this.customerForm.value;
    data.restaurantId = 1;
    data.status = true;
    data.address = data.address + ',' + 'Vietnam';
    console.log(data);
    this.customerService.create(data).subscribe(res => {
      this.router.navigate(['/login']);
    });
  }


}
