import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CartService } from 'app/entities/services/cart/cart.service';
import { ProductService } from 'app/entities/services/product/product.service';
import { LOCALSTORAGEFORCUSTOMER, ISCUSTOMERLOGGED } from 'app/static/constants/site.constants';
import { ICart } from 'app/entities/interfaces/cart';
import { Product } from 'app/entities/interfaces/product';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {



  displayedColumns: string[] = ['dishId', 'name', 'price', 'edit', 'cancel'];

  dataSource;

  orders: {};
  customerId: number;
  isCustomerLoggedIn: Boolean;
  iCart: ICart[] = [];
  ELEMENT_DATA = [];
  testCart = 0;

  products: Product[] = [];

  cartTable: CartTable[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private productServices: ProductService,
    private cartServices: CartService
  ) { }

  ngOnInit() {
    this.customerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0');
    this.isCustomerLoggedIn = JSON.parse(localStorage.getItem(ISCUSTOMERLOGGED) || 'false');

    if (this.customerId === 0 && this.isCustomerLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.getAllCartItemsByCustomerId(this.customerId)
      this.getCartByCustomerId(this.customerId);
    }
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  viewCustomer(id) {
  }

  confirmCancel(id) {
  }

  getAllCartItemsByCustomerId(id) {
    this.cartServices.findAllByCustomerId(id).subscribe(res => {
      this.showCart(res);
    })
  }

  showCart(res) {
    this.iCart = res;
    console.log('carts -> ' + this.iCart)
  }

  getCartByCustomerId(id) {
    this.cartServices.findAllProcuctFromCartByCustomerId(id).subscribe(res => {
      this.show(res);
    })
  }

  show(res) {
    this.products = res;
    console.log(this.products)
    this.showCartOnTable();
  }


  showCartOnTable() {
    let cartT:  CartTable = {};
    let i;
    // tslint:disable-next-line:forin
    for (i in this.iCart) {
        let j
        // tslint:disable-next-line:forin
        for (j in this.products) {
          cartT = {};
            if (this.products[j].id === this.iCart[i].productId) {
              cartT.cartId = this.iCart[i].id;
              cartT.price = this.products[j].price;
              cartT.qty = this.iCart[i].totalItem;
              cartT.totalPrice = this.iCart[i].totalItem * this.products[j].price;
              cartT.id = this.products[j].id;
            }
        }
        this.cartTable[i] = cartT;
    }

    console.log(this.cartTable);
  }


  test() {}

}

export interface CartTable {
  id?: number;
  name?: string;
  price?: number;
  qty?: number;
  totalPrice?: number
  cartId?: number;

}
