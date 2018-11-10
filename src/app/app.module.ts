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
import { TableComponent } from './table/table.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { MaterialModule } from './material/material.module';
import { DialogContentComponent } from './shared/Dialog/dialog-content/dialog-content.component';
import { AppInjector } from './app.injector';

import { HttpClientModule } from '@angular/common/http';
import { AuthServerProvider, LoginService } from './core';
import { SocialDialogComponent } from './Containers/config/SocialMedia/socialDialog/socialDialog.component';
import { TimeManagerDialogComponent } from './Containers/config/time-manager/time-manager-dialog/time-manager-dialog.component';
import { AddressDialogComponent } from './Containers/config/address/address-dialog/address-dialog.component';
import { ConformDeleteDialogComponent } from './Containers/account/customer/conform-delete-dialog/conform-delete-dialog.component';
import { CustomerContainersModule } from './customer-containers/customer-containers.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    SiteLayoutComponent,
    AppLayoutComponent,
    DialogContentComponent,
    SocialDialogComponent,
    TimeManagerDialogComponent,
    AddressDialogComponent,
    ConformDeleteDialogComponent
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
    DialogContentComponent,
    SocialDialogComponent,
    TimeManagerDialogComponent,
    AddressDialogComponent,
    ConformDeleteDialogComponent
  ],
  providers: [AppInjector, AuthServerProvider, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(appInjector: AppInjector) { }
}
