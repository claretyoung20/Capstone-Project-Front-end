import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { LoginServiceService } from './service/LoginServiceService';
import { IAccount } from 'app/entities/model/user/iaccount.interface';

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
    private loginServices: LoginServiceService,
    private fb: FormBuilder
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

  getAll() {
    this.loginServices.findAll().subscribe(res => {
      this.accounts = res;
      console.log(this.accounts);
    });
  }
  login() {
    const data = this.loginForm.value;
    data.rememberMe =  true;
    console.log(data);
  }
  processToShow(res) {
    this.accounts = res.content;
    return res;
  }
}
