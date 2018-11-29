import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISCUSTOMERLOGGED, LOCALSTORAGEFORCUSTOMER } from 'app/static/constants/site.constants';
import { CartService } from 'app/entities/services/cart/cart.service';
import { ICart } from 'app/entities/interfaces/cart';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  customerLoggedIn = false;
  cartTotal = 0;
  status: Boolean;
  customerId: 0;
  constructor(
    private cartServices: CartService
  ) { }

  ngOnInit() {
    this.customerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0');
    if (this.customerId !== 0) {
      this.getCartTotalByCustomerId(this.customerId);
    }
  }

  getCartTotalByCustomerId(id) {
    this.cartServices.findAllByCustomerId(id).subscribe(res => {
      let iCart: ICart = {};
      let cart: any = {};
      // tslint:disable-next-line:forin
      for (cart in res) {
          iCart = res[cart];
          this.cartTotal += iCart.totalItem;
      }
      console.log('total item: ' + this.cartTotal);
      console.log(res);
    })
  }

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
