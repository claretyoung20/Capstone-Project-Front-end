import { TableModule } from './table/table.module';
import { PromotionModule } from './promotion/promotion.module';
import { MenuModule } from './menu/menu.module';
import { CategoryModuleModule } from './category/category-module.module';
import { TimeManagerComponent } from './config/time-manager/time-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { OrderComponent } from './order/order.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SocialMediaComponent } from './config/SocialMedia/social-media.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from './../material/material.module';
import { SidebarModule } from './../sidebar/sidebar.module';
import { AppRoutes } from './../app.routing';
import { AddressComponent } from './config/address/address.component';
import { AccountModule } from './account/account.module';
import { CustomerComponent } from './Customers/customer/customer.component';
import { ReservationHistoryComponent } from './reservation/reservation-history/reservation-history.component';
import { OrderHistoryComponent } from './order/order-history/order-history.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CategoryModuleModule,
    AccountModule,
    MenuModule,
    PromotionModule,
    TableModule
  ],
  declarations: [
    ConfigComponent,
    StatisticsComponent,
    OrderComponent,
    ReservationComponent,
    LoginComponent,
    TimeManagerComponent,
    SocialMediaComponent,
    AddressComponent,
    CustomerComponent,
    ReservationHistoryComponent,
    OrderHistoryComponent
  ]
})
export class ContainersModule { }
