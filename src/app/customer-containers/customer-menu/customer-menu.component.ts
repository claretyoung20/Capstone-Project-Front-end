import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/entities/services/product/product.service';
import { ProductTypeService } from 'app/entities/services/product-type/product-type.service';
import { CategoryService } from 'app/entities/services/category/category.service';
import { Category } from 'app/entities/interfaces/category';
import { Product } from 'app/entities/interfaces/product';
import { ProductType } from 'app/entities/interfaces/productType';
import { LOCALSTORAGEFORCUSTOMER, ISCUSTOMERLOGGED } from 'app/static/constants/site.constants';
import { MatDialog } from '@angular/material';
import { MenuAddCartComponent } from './menu-add-cart/menu-add-cart.component';
import { CartService } from 'app/entities/services/cart/cart.service';
import { ICart } from 'app/entities/interfaces/cart';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-menu',
  templateUrl: './customer-menu.component.html',
  styleUrls: ['./customer-menu.component.css']
})
export class CustomerMenuComponent implements OnInit {

    /* paganation */
    pageSize = 10;
    currentPage = 0;
    pager: any = {};
    totalItems: any = 0;

  category: Category[] = [];
  products: Product[] = [];
  productTypes: ProductType[] = [];
  currentTab1: number;
  customerId: number;
  productId: number;
  isCustomerLoggedIn: Boolean;
  cart: ICart;
  isfindSuccessFull = false;
  isfindError = false;

  noProductMeesage = '';

  constructor(
    private productTypeServices: ProductTypeService,
    private productServices: ProductService,
    private categoryServices: CategoryService,
    private cartServices: CartService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllProductType();
    this.getAllCategory();

  }

  // check if customer is login
  isLoggedIn() {
  }

  // get All product type
  getAllProductType() {
    this.productTypeServices.findAll().subscribe(res => {
      this.productTypes = res;
      console.log(res);
    })
  }

  // get all product by product type
  getAllCategory() {
      const query = {
          size: this.pageSize,
          page: this.currentPage
      }
    this.categoryServices.query(query).subscribe(res => {
      this.category = res.content;
      this.stCurrentTable(res.content);
      console.log(res);
    })
    return this.category;

  }

  // get all product by category
  getAllProductByCategory() {
      this.noProductMeesage = '';
    this.productServices.findAllByCategory(this.currentTab1).subscribe(res => {
      this.products = res;
        if (res.length < 1 ) {
            this.noProductMeesage = 'Not Dishes available at the moment. '
        }
      console.log(res);
    })
  }

  changeTab(id) {
    console.log(id);
    this.currentTab1 = id;
    this.getAllProductByCategory();
  }

  addTocart(pId, prodctName, productPrice, createdDate) {
    // check if use is logged in
    this.customerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0');
    this.isCustomerLoggedIn = JSON.parse(localStorage.getItem(ISCUSTOMERLOGGED) || 'false');

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
      this.cartServices.findAllByPudctIdAndCustomerId(productId, custmId).subscribe((res: HttpResponse<ICart>) => {
        const cartData: ICart = {
          id: res.body.id,
          totalItem: res.body.totalItem + 1,
          productId: productId,
          customerId: custmId,
          productName: prodctName,
          productPrice: productPrice,
          dateCreated: createdDate
        }

        this.cartServices.update(cartData).subscribe(result => {
          console.log(result);
          // open dialog
          this.openCartDialog('message');
        })
      }, () => {
          const cartData: ICart = {
            totalItem: 1,
            productId: productId,
            customerId: custmId,
            productName: prodctName,
            productPrice: productPrice,
            dateCreated: createdDate
          };
          this.cartServices.create(cartData).subscribe(result => {
            console.log(result);
            this.openCartDialog('message');
          });
        });
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

    private stCurrentTable(res: any) {
        this.currentTab1 = res[0].id
        this.getAllProductByCategory();
    }
}

