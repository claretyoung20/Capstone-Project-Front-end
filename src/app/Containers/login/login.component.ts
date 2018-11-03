import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { IAccount } from 'app/entities/model/user/iaccount.interface';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';


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

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private app: LoginService
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
    const data =  this.loginForm.value;
    this.loginService
        .login({
            username: data.login,
            password: data.password,
            rememberMe: true
        })
        .then(() => {
           console.log('successful');
           this.router.navigateByUrl('/admin/dashboard');
        })
        .catch(() => {
          this.router.navigateByUrl('/admin/login');
          console.log(' not successful');
        });
}

authenticated() { return this.app.authenticated; }

}
