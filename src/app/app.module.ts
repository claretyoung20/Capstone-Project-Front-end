import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatDialogModule} from '@angular/material'

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { CustomerComponent } from './Containers/Customers/customer/customer.component';
import { SocialMediaComponent } from './Containers/Config/SocialMedia/social-media.component';
import { ConfigComponent } from './Containers/Config/config.component';
import { AccountComponent } from './Containers/account/account.component';
import { StatisticsComponent } from './Containers/statistics/statistics.component';
import { PromotionComponent } from './Containers/promotion/promotion.component';
import { CategoryComponent } from './Containers/category/category.component';
import { MenuComponent } from './Containers/menu/menu.component';
import { OrderComponent } from './Containers/order/order.component';
import { ReservationComponent } from './Containers/reservation/reservation.component';
import { HomeComponent } from './customer-containers/home/home.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    CustomerComponent,
    SocialMediaComponent,
    ConfigComponent,
    AccountComponent,
    StatisticsComponent,
    PromotionComponent,
    CategoryComponent,
    MenuComponent,
    OrderComponent,
    ReservationComponent,
    HomeComponent,
    SiteLayoutComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
