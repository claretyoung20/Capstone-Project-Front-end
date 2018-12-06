import { TimeManager } from 'app/entities/interfaces/timeManager';
import { Address } from './../../entities/interfaces/address';
import { HHSocialMedia } from './../../entities/model/hh-social-media.model';
import { AddressService } from './../../entities/services/address/address.service';
import { TimeManagerService } from './../../entities/services/time-manager/timeManager.service';
import { HhSocialService } from './../../entities/services/hh-social/hh-social.service';
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

  socials: HHSocialMedia[] = [];
  timeMagers: TimeManager[] = [];
  address: Address[] = [];

  constructor(
    private cartServices: CartService,
    private socialServivce: HhSocialService,
    private timeMangerServivce: TimeManagerService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.customerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0');
    if (this.customerId !== 0) {
      this.getCartTotalByCustomerId(this.customerId);
    }
    this.getAllAdress();
    this.getSocialedia();
    this.getTimeanager();
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

  // get address
  getAllAdress() {
    this.addressService.findAll().subscribe( res => {
      console.log(res);
      this.address = res;
    })
  }

  // get time
  getTimeanager() {
    this.timeMangerServivce.findAll().subscribe( res => {
      console.log(res);
      this.timeMagers = res;
    })
  }

  // get social media
  getSocialedia() {
    this.socialServivce.findAll().subscribe( res => {
      console.log(res);
      this.socials = res;
    })
  }
}
