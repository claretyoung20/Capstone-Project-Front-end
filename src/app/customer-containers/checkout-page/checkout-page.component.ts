import {ERROR_MESSAGE} from './../../static/constants/site.constants';
import {Table} from './../../entities/interfaces/table';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SaleOrder} from './../../entities/interfaces/saleOrder';
import {SaleOrderService} from 'app/entities/services/saleOrder/sale-order.service';
import {OrderService} from './../../entities/services/order/order.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {CartService} from 'app/entities/services/cart/cart.service';
import {ProductService} from 'app/entities/services/product/product.service';
import {LOCALSTORAGEFORCUSTOMER, ISCUSTOMERLOGGED} from 'app/static/constants/site.constants';
import {ICart} from 'app/entities/interfaces/cart';
import {Product} from 'app/entities/interfaces/product';
import {RemoveConfirmComponent} from './remove-confirm/remove-confirm.component';
import {Order} from 'app/entities/interfaces/order';
import {OrderSucessComponent} from './order-sucess/order-sucess.component';
import {TableService} from 'app/entities/services/table/table.service';
import {CouponService} from '../../entities/services/coupon/coupon.service';
import {Coupon} from '../../entities/interfaces/coupon';

@Component({
    selector: 'app-checkout-page',
    templateUrl: './checkout-page.component.html',
    styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

    tableForm: FormGroup;
    couponForm: FormGroup;
    submitForm = false;

    displayedColumns: string[] = ['id', 'name', 'productPrice', 'totalItem', 'totalPrice', 'action'];

    dataSource;

    orderSave: Order = {};
    saleOrdersSave: SaleOrder = {}
    savedOrder = false;
    customerId: number;
    isCustomerLoggedIn: Boolean;
    iCart: ICart[] = [];

    products: Product[] = [];

    carts: ICart[] = [];

    totalPriceSave: number;

    tables: Table[] = [];

    errorMessage = '';
    errorMessageCoupon = ''
    couponCode = '';
    couponAmount = 0;
    coupounToApply: Coupon;
    currentTotalPrice = 0;

    currentOrder: Order[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public dialog: MatDialog,
        private productServices: ProductService,
        private cartServices: CartService,
        private orderService: OrderService,
        private orderSaleService: SaleOrderService,
        private tableServces: TableService,
        private couponService: CouponService
    ) {
    }

    ngOnInit() {
        this.buildForm();
        this.buildForm2();
        this.customerId = JSON.parse(localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0');
        this.isCustomerLoggedIn = JSON.parse(localStorage.getItem(ISCUSTOMERLOGGED) || 'false');

        if (this.customerId === 0 && this.isCustomerLoggedIn) {
            this.router.navigate(['/login']);
        } else {
            this.getAllCartItemsByCustomerId(this.customerId)
        }

        this.getCurrentCustomerrder();
        this.getAllTable();
    }

    getAllTable(): any {
        this.tableServces.getIsAvialableTable().subscribe(res => {
            this.tables = res;
            // console.log(this.tables);
        })
    }

    buildForm() {
        this.tableForm = this.fb.group({
            tableId: [null, [Validators.required]]
        });
    }

    buildForm2() {
        this.couponForm = this.fb.group({
            couponCode: [null, [Validators.required]]
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getCurrentCustomerrder() {
        this.orderService.getCurrentCustomerActiveOrder(this.customerId).subscribe(res => {
            this.currentOrder = res;
           // console.log(this.currentOrder);
        })
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

    show(res) {
        console.log('VVVV');
        this.dataSource = new MatTableDataSource(res);
        this.carts = res;
        this.totalPrice();
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
           // console.log(`Dialog result: ${result}`);
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
        this.currentTotalPrice = this.totalPriceSave;
        return this.totalPriceSave;
    }

    applyCoupon() {

        if (this.couponForm.invalid) {
            this.errorMessageCoupon = 'Coupon can\'\t be empty';
            return;
        }
        const code = this.couponForm.value.couponCode;

        this.couponService.applyCoupon(this.totalPriceSave, code, this.customerId).subscribe(res => {
                this.applyCouponData(res);
                this.errorMessageCoupon = '';
            },
            () => {
                this.applyCouponData({});
                this.errorMessageCoupon = 'Invalid Coupon: ' + code;
            })


    }

    applyCouponData(data) {
        this.coupounToApply = data;
        // console.log(this.coupounToApply);

        this.couponCode = this.coupounToApply.code || '';
        this.couponAmount = this.coupounToApply.price || 0;
    }

    orderNow() {
        // this.totalPrice();
        // add to order
        // total price
        if (this.currentOrder.length >= 1) {
            this.tableForm.value.tableId = this.currentOrder[0].bookTableId;
        }
       // console.log(this.tableForm.value);
        this.submitForm = true;
        this.errorMessage = '';

        if (this.tableForm.invalid && this.tableForm.value.tableId === null) {
            this.errorMessage = ERROR_MESSAGE.REQUIRED_FIELD;
            return;
        }

        this.orderSave.baseTotal = this.totalPrice();
        this.orderSave.totalPrice = this.totalPriceSave - this.couponAmount;
        this.orderSave.customerId = this.customerId;
        this.orderSave.restaurantId = 1;
        this.orderSave.orderStatusId = 1;
        if (this.coupounToApply) {
            this.orderSave.couponId = this.coupounToApply.id || null;
        }
        this.orderSave.bookTableId = this.tableForm.value.tableId;

        this.orderService.create(this.orderSave).subscribe(res => {
           // console.log('successful');

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
                    this.cartServices.delete(this.carts[cartItems].id).subscribe(resultDelete => {
                       //  console.log('succesfully deleted');
                    })
                }
            }

        })
        // confirm sucess
        const dialogRef = this.dialog.open(OrderSucessComponent);

        dialogRef.afterClosed().subscribe(result => {
            // console.log(`Dialog result: ${result}`);
            this.router.navigate(['/profile']);
        });
    }


    minusItem(id) {
        console.log('-1 ' + id);
        // get current Item total
        let currentCart: ICart = {};
        this.cartServices.find(id).subscribe(res => {
            currentCart = res;
            // minus by one
            currentCart.totalItem = currentCart.totalItem - 1;
            if (currentCart.totalItem !== 0) {
                this.cartServices.update(currentCart).subscribe(result => {
                    this.getAllCartItemsByCustomerId(this.customerId);
                    this.getCurrentCustomerrder();
                    this.getAllTable();
                })
            }
        });
    }

    addItem(id) {
        // get current Item total
        // add extra one
        console.log('+1 ' + id);
        let currentCart: ICart = {};
        this.cartServices.find(id).subscribe(res => {
            currentCart = res;
            // add by one
            currentCart.totalItem = currentCart.totalItem + 1;
            if (currentCart.totalItem  !== 0 ) {
                this.cartServices.update(currentCart).subscribe(result => {
                    this.getAllCartItemsByCustomerId(this.customerId);
                    this.getCurrentCustomerrder();
                    this.getAllTable();
                })
            }
        });
    }

}
