import { MatDialog } from '@angular/material';
import { IUser } from './../../entities/model/user/user.model';
import { Customer, UserCustomer } from 'app/entities/interfaces/customer';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ERROR_MESSAGE } from './../../static/constants/site.constants';
import { MyErrorStateMatcher } from './../../Containers/login/login.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { TimeService } from 'app/shared/util/time.service';
import { ConfirnRegistrationComponent } from './confirnRegistration/confirnRegistration.component';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})

export class RegisterCustomerComponent implements OnInit {

  customerForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  submitForm = false;
  errorMessage = '';

  user: IUser = {};
  customer: Customer = {};
  userCustomer: UserCustomer = {};

  dateOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-dd-mm'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private timeService: TimeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.customerForm = this.fb.group({
      id: [''],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      address: [''],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [''],
      status: [''],
      dateOfBirth: [''],
      login: [null, [Validators.required]],
    })
  }
  addCustomer() {
    this.submitForm = true;
    this.errorMessage = '';
    if (this.customerForm.invalid) {
      this.errorMessage = ERROR_MESSAGE.REQUIRED_FIELD;
      return;
    }
    const data = this.customerForm.value;
    console.log(data);

    this.prepareToSave(data);

    // create new user
    // get user data
    this.user.authorities = ['ROLE_CUSTOMER'];
    this.user.firstName = data.firstName;
    this.user.lastName = data.lastName;
    this.user.login = data.login;
    this.user.email = data.email;
    this.user.activated = true;
    this.user.langKey = 'en';
    // get userCustomer data
    this.userCustomer.address = data.address;
    this.userCustomer.dateOfBirth = data.dateOfBirth;
    this.userCustomer.restaurantId = 1;
    this.userCustomer.phoneNumber = data.phoneNumber;

    console.log(this.user);
    console.log(this.userCustomer);
    // call api to create new user
    this.customerService.customerCreate(this.user).subscribe(res => {
      this.userCustomer.userId = res.id;
      this.customerService.create(this.userCustomer).subscribe(result => {
        console.log('User and customer successfully created');
        console.log(result);

        // open dialog to
        this. openDialog();
      },
      error => {
        console.log('Creating new cutomer not successful');
        console.log(error.message);
      })
    },
    error => {
      console.log(error.message);
    })
  }

   // date
   onDateChanged(event: IMyDateModel): void {
    console.log('event date', event);
  }

  prepareToSave(data) {
    const dataProcess = data;
    dataProcess.dateOfBirth = this.timeService.fromTimeDatePicker(dataProcess.dateOfBirth).setUTC().toISOString();
    return dataProcess;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirnRegistrationComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['/login']);
    });
  }
}
