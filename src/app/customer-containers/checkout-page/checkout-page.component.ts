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
  ELEMENT_DATA: PeriodicElement[] = [];
  testCart = 0;

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
      this.getCartByCustomerId(this.customerId);
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    }
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  viewCustomer(id) {
  }

  confirmCancel(id) {
  }

  // get the cart item
  getCartByCustomerId(id) {
    this.cartServices.findAllByCustomerId(id).subscribe(
      response => {
       // tslint:disable-next-line:forin
       for (const c in response) {
        this.iCart[c] = response[c];
        console.log('dadad' + this.iCart[c]);
       }
       console.log('b4');
       console.log(this.iCart);
       this.getCartByProductId();
       console.log('after');
     }
    );
  }

  processToShow(res) {
    console.log('result from server' + res);
  }


  getCartByProductId() {
    let iCartNew: ICart = {};
    let cart: any = {};
    console.log('current cart items=> ' + this.iCart);
    // tslint:disable-next-line:forin
    if (this.iCart !== null) {
      // tslint:disable-next-line:forin
      for (cart in this.iCart) {
        // get the cuurent item on cart
        iCartNew = this.iCart[cart];
        let currntProduct: Product = {};
        console.log('currwnt cart => ' + iCartNew);
        // use the cuurent cart product id to get the product
        this.getProductById(iCartNew.productId).subscribe((res: Product) => {
          currntProduct = res;
          console.log('currwnt Product => ' + currntProduct);
          const pId = currntProduct.id;
          const name = currntProduct.name;
          const totalItem = iCartNew.totalItem;
          const price = totalItem * currntProduct.price;

          const periodicElement: PeriodicElement = {};
          periodicElement.dishId = pId;
          periodicElement.name = name;
          periodicElement.price = price;
          console.log('periodicElement---' + periodicElement.name);
          this.ELEMENT_DATA[cart] = periodicElement;
          console.log(' Element => ' + this.ELEMENT_DATA[cart]);
        });
      }
    }

  }

  getProductById(id) {
    return this.productServices.find(id);
  }

  test() {
    console.log('result from server' + this.iCart);
  }

}


export interface PeriodicElement {
  name?: string;
  dishId?: string;
  price?: number;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { dishId: 'd01', name: 'Rice', price: 10.79 },
//   { dishId: 'd02', name: 'Rice', price: 10.79 },
//   { dishId: 'd03', name: 'Rice', price: 10.79 },
//   { dishId: 'd04', name: 'Rice', price: 10.79 },
// ];
