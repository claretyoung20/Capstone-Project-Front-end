import { ISCUSTOMERLOGGED } from './../../static/constants/site.constants';
import { MenuAddCartComponent } from './../customer-menu/menu-add-cart/menu-add-cart.component';
import { MatDialog } from '@angular/material';
import { ICart } from './../../entities/interfaces/cart';
import { HttpResponse } from '@angular/common/http';
import { CartService } from './../../entities/services/cart/cart.service';
import { ICoupon } from './../../entities/interfaces/iCoupon';
import { CouponService } from './../../entities/services/coupon/coupon.service';
import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGEFORCUSTOMER } from 'app/static/constants/site.constants';
import { ProductService } from 'app/entities/services/product/product.service';
import { Product } from 'app/entities/interfaces/product';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customerId: number;
  isCustomerLoggedIn: Boolean;
  products: Product[] = [];
  coupons: ICoupon[] = [];
  today = new Date();
  jstoday;

  dataThumb1 =
    'http://localhost:4200/assets/revolution/assets/100x50_a617d-slider2-bg.jpg';
  dataThumb2 =
    'http://localhost:4200/assets/revolution/assets/100x50_a617d-slider2-bg.jpg';
  constructor(
    private productServices: ProductService,
    private couponServices: CouponService,
    private cartServices: CartService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCustomerId();
    this.getAllShowOnHpageProduct();
    this.getCoupon();
    this.getCoupon();
  }

  getCustomerId() {
    this.customerId = JSON.parse(
      localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0'
    );
    console.log(this.customerId);
  }

  getAllShowOnHpageProduct() {
    this.productServices.findProductsByShowOnHomepage().subscribe(res => {
      console.log(res);
      this.products = res;
    });
  }

  getCoupon() {
    this.couponServices.findValidCoupon().subscribe(res => {
      console.log(res);
      this.coupons = res;
    });
  }

  addTocart(pId) {
    // check if use is logged in
    this.customerId = JSON.parse(
      localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0'
    );
    this.isCustomerLoggedIn = JSON.parse(
      localStorage.getItem(ISCUSTOMERLOGGED) || 'false'
    );

    // if not logged show pop up asking customer to register or logggin
    if (this.customerId === 0 && !this.isCustomerLoggedIn) {
      // open dialog
      console.log('Login please');
      this.openCartDialog('auth');
    } else {
      // if logged in show dialog of sucessfuly adding to cart
      console.log('succcesfully added to cart');
      const custmId = this.customerId;
      const productId = pId;

      console.log('product id: ' + productId + ' Customer Id: ' + custmId);

      // check if the item is in cart already
      this.cartServices
        .findAllByPudctIdAndCustomerId(productId, custmId)
        .subscribe(
          (res: HttpResponse<ICart>) => {
            const cartData: ICart = {
              id: res.body.id,
              totalItem: res.body.totalItem + 1,
              productId: productId,
              customerId: custmId
            };

            this.cartServices.update(cartData).subscribe(result => {
              console.log(result);
              // open dialog
              this.openCartDialog('message');
            });
          },
          () => {
            const cartData: ICart = {
              totalItem: 1,
              productId: productId,
              customerId: custmId
            };
            this.cartServices.create(cartData).subscribe(result => {
              console.log(result);
              this.openCartDialog('message');
            });
          }
        );
    }
  }

  openCartDialog(dialogitle) {
    const title = dialogitle;
    const dialogRef = this.dialog.open(MenuAddCartComponent, {
      data: {
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
