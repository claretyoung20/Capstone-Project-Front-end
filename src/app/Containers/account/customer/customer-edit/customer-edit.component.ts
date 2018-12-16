import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, UserCustomer } from 'app/entities/interfaces/customer';
import {User} from '../../../../entities/interfaces/user';
import {UserService} from '../../../../entities/model/user/user.service';
import {AccountStaffService} from '../../../../entities/services/account/account.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  id: any;
  isSaving: boolean;
  user: User = {};
  customers: UserCustomer
  customerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private userService: UserService,
    private accountService: AccountStaffService
  ) { }

  ngOnInit() {
      this.isSaving = false;
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.getCustomerById(this.id);
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

  getCustomerById(id) {
    console.log(id);
    this.customerService.findcustomerByUserId(id).subscribe((custumerData: UserCustomer) => {
      this.customers = custumerData
      console.log(custumerData);
    })

  }

    save() {
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    previousState() {
        this.router.navigate(['/admin/account/customer']);
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
