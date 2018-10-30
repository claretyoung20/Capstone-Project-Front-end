import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
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
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  accounts: IAccount[] = [];

  constructor(private loginServices: LoginServiceService) { }

  ngOnInit() {
    this.getAll()
  }
  getAll() {
    this.loginServices.findAll().subscribe(res => {
      this.accounts = res;
      console.log(this.accounts);
    });
  }

  processToShow(res) {
    this.accounts = res.content;
    return res;
  }
}
