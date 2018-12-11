import { MenuModule } from './menu/menu.module';
import { CategoryModuleModule } from './category/category-module.module';
import { TimeManagerComponent } from './config/time-manager/time-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PromotionComponent } from './promotion/promotion.component';
import { CategoryComponent } from './category/category.component';
import { MenuComponent } from './menu/menu.component';
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
    MenuModule
  ],
  declarations: [
    ConfigComponent,
    StatisticsComponent,
    PromotionComponent,
    OrderComponent,
    ReservationComponent,
    LoginComponent,
    TimeManagerComponent,
    SocialMediaComponent,
    AddressComponent,
    CustomerComponent
  ]
})
export class ContainersModule { }
