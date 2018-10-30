import { TimeManagerComponent } from './config/time-manager/time-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './Customers/customer/customer.component';
import { ConfigComponent } from './config/config.component';
import { AccountComponent } from './account/account.component';
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


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    CustomerComponent,
    ConfigComponent,
    AccountComponent,
    StatisticsComponent,
    PromotionComponent,
    CategoryComponent,
    MenuComponent,
    OrderComponent,
    ReservationComponent,
    LoginComponent,
    TimeManagerComponent,
    SocialMediaComponent
  ]
})
export class ContainersModule { }
