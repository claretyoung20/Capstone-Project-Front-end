import { CancelOrderComponent } from './customer-containers/customer-profile/list-order-component/cancel-order/cancel-order.component';
import { OrderSucessComponent } from './customer-containers/checkout-page/order-sucess/order-sucess.component';
import { CancelResevatioDialogComponent } from './customer-containers/customer-profile/cancel-resevatio-dialog/cancel-resevatio-dialog.component';
import { ConfirmDeleteComponent } from './Containers/category/confirm-delete/confirm-delete.component';
import { PromotionDialogComponent } from './Containers/promotion/promotion-dialog/promotion-dialog.component';
import { MenuDialogComponent } from './Containers/menu/menu-dialog/menu-dialog.component';
import { RemoveConfirmComponent } from './customer-containers/checkout-page/remove-confirm/remove-confirm.component';
import { ConfirmReservationComponent } from './customer-containers/table-map/confirm-reservation/confirm-reservation.component';
import { ErrorDialogComponent } from './customer-containers/customer-login/error-dialog/error-dialog.component';
import { ConfirnRegistrationComponent } from './customer-containers/register-customer/confirnRegistration/confirnRegistration.component';
import { ContainersModule } from './Containers/containers.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { SharedModule } from './shared/shared.module'
import { NguiMapModule } from '@ngui/map';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { MaterialModule } from './material/material.module';
import { DialogContentComponent } from './shared/Dialog/dialog-content/dialog-content.component';
import { AppInjector } from './app.injector';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { HttpClientModule } from '@angular/common/http';
import { AuthServerProvider, LoginService } from './core';
import { SocialDialogComponent } from './Containers/config/SocialMedia/socialDialog/socialDialog.component';
import { TimeManagerDialogComponent } from './Containers/config/time-manager/time-manager-dialog/time-manager-dialog.component';
import { AddressDialogComponent } from './Containers/config/address/address-dialog/address-dialog.component';
import { ConformDeleteDialogComponent } from './Containers/account/customer/conform-delete-dialog/conform-delete-dialog.component';
import { CustomerContainersModule } from './customer-containers/customer-containers.module';
import { EditCustomerAccountComponent } from './customer-containers/customer-profile/edit-customer-account/edit-customer-account.component';
import { MenuAddCartComponent } from './customer-containers/customer-menu/menu-add-cart/menu-add-cart.component';
import { ViewDialogComponent } from './Containers/order/viewDialog/viewDialog.component';
import { ViewProductDetailComponent } from './Containers/order/viewProductDetail/viewProductDetail.component';
import { TableDialogComponent } from './Containers/table/table-dialog/table-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    SiteLayoutComponent,
    AppLayoutComponent,
    DialogContentComponent,
    SocialDialogComponent,
    TimeManagerDialogComponent,
    AddressDialogComponent,
    ConformDeleteDialogComponent,
    MenuAddCartComponent,
    ViewDialogComponent,
    ViewProductDetailComponent,
    ConfirnRegistrationComponent,
    ErrorDialogComponent,
    ConfirmReservationComponent,
    RemoveConfirmComponent,
    MenuDialogComponent,
    PromotionDialogComponent,
    TableDialogComponent,
    ConfirmDeleteComponent,
    CancelResevatioDialogComponent,
    OrderSucessComponent,
    CancelOrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ContainersModule,
    CustomerContainersModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE' })

  ],
  entryComponents: [
    CancelOrderComponent,
    OrderSucessComponent,
    DialogContentComponent,
    SocialDialogComponent,
    TimeManagerDialogComponent,
    AddressDialogComponent,
    ConformDeleteDialogComponent,
    EditCustomerAccountComponent,
    MenuAddCartComponent,
    ViewDialogComponent,
    ViewProductDetailComponent,
    ConfirnRegistrationComponent,
    ErrorDialogComponent,
    ConfirmReservationComponent,
    RemoveConfirmComponent,
    MenuDialogComponent,
    PromotionDialogComponent,
    TableDialogComponent,
    ConfirmDeleteComponent,
    CancelResevatioDialogComponent
  ],
  providers: [AppInjector, AuthServerProvider, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(appInjector: AppInjector,
    private dpConfig: NgbDatepickerConfig
    ) {
      this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
     }
}
