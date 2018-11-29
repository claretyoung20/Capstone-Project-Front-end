import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { ISCUSTOMERLOGGED, LOCALSTORAGEFORCUSTOMER } from 'app/static/constants/site.constants';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  login() {
    const data = this.loginForm.value;
    this.customerService.customerLogin(data.email, data.password).subscribe(res => {
      localStorage.setItem(ISCUSTOMERLOGGED, 'true');
      localStorage.setItem(LOCALSTORAGEFORCUSTOMER, res.id);
      console.log(res);
       this.router.navigate(['/']);
    })
  }

}
