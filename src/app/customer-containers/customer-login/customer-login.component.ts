import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { IAccount } from 'app/entities/model/user/iaccount.interface';
import { MyErrorStateMatcher } from './../../Containers/login/login.component';
import { HttpResponse } from '@angular/common/http';
import { CUSTOMERROLE } from './../../static/constants/site.constants';
import { AccountStaffService } from 'app/entities/services/account/account.service';
import { LoginService, User } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'app/entities/services/customer/customer.service';
import { ISCUSTOMERLOGGED, LOCALSTORAGEFORCUSTOMER, CURRENTADMINROLE } from 'app/static/constants/site.constants';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  accounts: IAccount[] = [];

  user: User;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private loginService: LoginService,
    private app: LoginService,
    private accountService: AccountStaffService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      login: [''],
      password: ['']
    })
  }

  login() {
    localStorage.clear();
    localStorage.removeItem(CUSTOMERROLE);
    localStorage.removeItem(LOCALSTORAGEFORCUSTOMER);
    const data =  this.loginForm.value;
    this.loginService
        .login({
            username: data.login,
            password: data.password,
            rememberMe: true
        })
        .then(() => {
           console.log('successful');
           this.getAccount(data.login, data.password);
        })
        .catch(() => {
          this.openDialog();
          console.log(' not successful');
        });
}

authenticated() { return this.app.authenticated; }

// access user account and get
getAccount(login, password) {
  // get by login and password
  this.accountService.findByUserLogin(login, password) .subscribe(
    (res: HttpResponse<User>) => this.onSuccess(res.body),
    (res: HttpResponse<any>) => this.onError(res.body)
);

}

private onSuccess(data) {
  this.user = data;
  console.log(this.user);
  localStorage.setItem(LOCALSTORAGEFORCUSTOMER, this.user.id);
  localStorage.setItem(CUSTOMERROLE, this.user.authorities[0]);

   this.router.navigateByUrl('/');
}

private onError(error) {
 // message error
}

openDialog() {
  const dialogRef = this.dialog.open(ErrorDialogComponent, {
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.router.navigateByUrl('/login');
  });
}
}
