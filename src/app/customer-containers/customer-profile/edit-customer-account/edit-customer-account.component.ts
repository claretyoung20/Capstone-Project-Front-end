import { IUser } from 'app/entities/model/user/user.model';
import { AccountStaffService } from 'app/entities/services/account/account.service';
import { TimeService } from 'app/shared/util/time.service';
import {
  ERROR_MESSAGE,
  LOCALSTORAGEFORUSERCUSTOMER
} from './../../../static/constants/site.constants';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { Component, OnInit, Inject } from '@angular/core';
import { Customer, UserCustomer } from 'app/entities/interfaces/customer';
import { Router } from '@angular/router';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { LOCALSTORAGEFORCUSTOMER } from 'app/static/constants/site.constants';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-customer-account',
  templateUrl: './edit-customer-account.component.html',
  styleUrls: ['./edit-customer-account.component.css']
})
export class EditCustomerAccountComponent implements OnInit {
  customerData: UserCustomer;
  customerId: number;
  customerForm: FormGroup;
  submitForm = false;
  errorMessage = '';
  user: IUser;
  userCustomerId: number;
  dateOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-dd-mm'
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<EditCustomerAccountComponent>,
    private timeService: TimeService,
    private accountService: AccountStaffService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.buildForm();
    this.customerId = JSON.parse(
      localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0'
    );
    // get user data
    if (this.data.title === 'edit') {
      this.user = this.data.resData;
    }
    this.getCustomerById(this.customerId);
  }

  getCustomerById(id) {
    if (id !== 0) {
      this.customerService.find(id).subscribe((custumerData: UserCustomer) => {
        this.customerData = custumerData;
        this.processToShow(custumerData);
      });
    } else {
      // return to home page
      this.router.navigate(['/login']);
    }
  }

  processToShow(data) {
    const dataShow: Customer = data;
    dataShow.dateOfBirth = this.timeService
      .fromString(dataShow.dateOfBirth)
      .toTimeDatePickerValue();
    dataShow.firstName = this.user.firstName;
    dataShow.lastName = this.user.lastName;
    dataShow.email = this.user.email;
    dataShow.login = this.user.login;
    console.log(this.user);
    this.pathValue(dataShow);
  }

  // date
  onDateChanged(event: IMyDateModel): void {
    console.log('event date', event);
  }

  buildForm() {
    this.customerForm = this.fb.group({
      id: [''],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      address: [''],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [''],
      dateOfBirth: [''],
      login: [null, [Validators.required]]
    });
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
      login: data.login || ''
    });
  }

  upDateCustomer() {
    this.submitForm = true;
    this.errorMessage = '';
    if (this.customerForm.invalid) {
      this.errorMessage = ERROR_MESSAGE.REQUIRED_FIELD;
      return;
    }

    // get old user data
    const oldUserData = this.user;
    const newUserData = this.customerForm.value;
    oldUserData.firstName = newUserData.firstName;
    oldUserData.lastName = newUserData.lastName;
    oldUserData.email = newUserData.email;

    // get old customer data
    let oldCustomerData = this.customerData;
    const newCustomerData = this.customerForm.value;

    oldCustomerData.address = newCustomerData.address;
    oldCustomerData.phoneNumber = newCustomerData.phoneNumber;
    oldCustomerData.dateOfBirth = newCustomerData.dateOfBirth;
    oldCustomerData = this.processToSave(oldCustomerData);

    this.customerService.updateCustomerUser(oldUserData).subscribe(res => {
      console.log('update successful')
      this.customerService.update(oldCustomerData).subscribe(result => {
        console.log(result)
        console.log('update successful')
        this.dialogRef.close();
      });
    });
  }

  processToSave(data) {
    const dataProcess = data;
    dataProcess.dateOfBirth = this.timeService
      .fromTimeDatePicker(dataProcess.dateOfBirth)
      .setUTC()
      .toISOString();
    return dataProcess;
  }
}
