import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISCUSTOMERLOGGED } from 'app/static/constants/site.constants';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  customerLoggedIn = false;
  status: Boolean;
  constructor() { }

  ngOnInit() {}

  isCustomerLogin() {
    this.status = JSON.parse(localStorage.getItem(ISCUSTOMERLOGGED) || 'false');
    if (this.status) {
      return '';
    } else {
      return 'none';
    }
  }

  showAccount() {
    this.status = JSON.parse(localStorage.getItem(ISCUSTOMERLOGGED) || 'false');
    if (this.status) {
      return 'none';
    } else {
      return 'block';
    }
  }

}
