import { SaleOrder } from './../../entities/interfaces/saleOrder';
import { SaleOrderService } from 'app/entities/services/saleOrder/sale-order.service';
import { OrderService } from './../../entities/services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CartService } from 'app/entities/services/cart/cart.service';
import { ProductService } from 'app/entities/services/product/product.service';
import { LOCALSTORAGEFORCUSTOMER, ISCUSTOMERLOGGED } from 'app/static/constants/site.constants';
import { ICart } from 'app/entities/interfaces/cart';
import { Product } from 'app/entities/interfaces/product';
import { RemoveConfirmComponent } from './remove-confirm/remove-confirm.component';
import { Order } from 'app/entities/interfaces/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {



  displayedColumns: string[] = ['id', 'name', 'productPrice', 'totalItem', 'totalPrice', 'action'];

  dataSource;

  orders: {};
  orderSave: Order = {};
  saleOrdersSave: SaleOrder = {}
  savedOrder = false;
  customerId: number;
  isCustomerLoggedIn: Boolean;
  iCart: ICart[] = [];
  ELEMENT_DATA = [];
  testCart = 0;

  products: Product[] = [];

  carts: ICart[] = [];

  totalPriceSave: number;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private productServices: ProductService,
    private cartServices: CartService,
    private orderService: OrderService,
    private orderSaleService: SaleOrderService
  ) { }

  ngOnInit() {
    this.customerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0');
    this.isCustomerLoggedIn = JSON.parse(localStorage.getItem(ISCUSTOMERLOGGED) || 'false');

    if (this.customerId === 0 && this.isCustomerLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.getAllCartItemsByCustomerId(this.customerId)
    }
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalPrice(price, item) {
    return price * item;
  }

  viewCustomer(id) {
  }

  confirmCancel(id) {
  }

  getAllCartItemsByCustomerId(id) {
    this.cartServices.findAllByCustomerId(id).subscribe(res => {
      this.show(res);
    })
  }

  show(res ) {
    console.log(res);
    this.dataSource = new MatTableDataSource(res);
    this.carts = res;
  }


  removeItem(id) {
   this.openCartDialog(id);
  }

  openCartDialog(id) {

    const dialogRef = this.dialog.open(RemoveConfirmComponent, {
      data: {
        itemId: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllCartItemsByCustomerId(this.customerId);
    });
  }

  totalPrice() {
    let cartItems;
    this.totalPriceSave = 0;
    for (cartItems in this.carts) {
      if (this.carts) {
        this.totalPriceSave += this.carts[cartItems].productPrice * this.carts[cartItems].totalItem;
      }
    }

    return this.totalPriceSave;
  }

  orderNow() {
    // this.totalPrice();
    // add to order
    // total price

    this.orderSave.baseTotal = this.totalPrice();
    this.orderSave.totalPrice = this.totalPrice();
    this.orderSave.customerId = this.customerId;
    this.orderSave.restaurantId = 1;
    this.orderSave.orderStatusId = 1;

    this.orderService.create(this.orderSave).subscribe( res => {
      console.log('successful');

      const orderId = res.id;
      let cartItems;
      for (cartItems in this.carts) {

        if (this.carts) {
          // save sale order
          this.saleOrdersSave = {};
          this.saleOrdersSave.happyOrderId = orderId;
          this.saleOrdersSave.basePrice = this.carts[cartItems].productPrice;
          this.saleOrdersSave.productId = this.carts[cartItems].productId;

          this.orderSaleService.create(this.saleOrdersSave).subscribe(result => {
          })
           this.cartServices.delete( this.carts[cartItems].id).subscribe(resultDelete => {
              console.log('succesfully deleted');
            })
        }
      }

    })
    this.router.navigate(['/profile']);
  }

}
