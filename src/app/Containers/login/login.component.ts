import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { IAccount } from 'app/entities/model/user/iaccount.interface';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { AccountStaffService } from 'app/entities/services/account/account.service';
import { User } from 'app/core';
import { HttpResponse } from '@angular/common/http';
import { CURRENTADMINROLE, CURRENTSTAFFORADMINID } from 'app/static/constants/site.constants';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  accounts: IAccount[] = [];

  user: User;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private app: LoginService,
    private accountService: AccountStaffService
    ) { }

  ngOnInit() {
    this.buildForm();
    // this.getAll()
  }
  buildForm() {
    this.loginForm = this.fb.group({
    id: [''],
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
    });
  }

  login() {
    localStorage.clear();
    localStorage.removeItem(CURRENTADMINROLE);
    localStorage.removeItem(CURRENTSTAFFORADMINID);
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
          this.router.navigateByUrl('/admin/login');
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

  let role = ''
  const userN = this.user.authorities;
  for (role in userN) {
      if (userN[role]) {
        localStorage.setItem(CURRENTADMINROLE, userN[role]);
      }
  }
  localStorage.setItem(CURRENTSTAFFORADMINID, this.user.id);

   this.router.navigateByUrl('/admin/dashboard');
}

private onError(error) {
 // message error
}

}
