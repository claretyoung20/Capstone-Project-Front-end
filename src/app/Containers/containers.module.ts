import { TimeManagerComponent } from './config/time-manager/time-manager.component';
import { ConfigModule } from './config/config.module';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FixedPluginModule} from './../shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './../shared/footer/footer.module';
import { NavbarModule} from './../shared/navbar/navbar.module';
import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module'
import { SidebarModule } from './../sidebar/sidebar.module';
import { AppRoutes } from './../app.routing';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    // ConfigModule,
    BrowserAnimationsModule,
    SharedModule
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
