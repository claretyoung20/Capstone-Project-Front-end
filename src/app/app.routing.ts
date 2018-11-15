import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { ConfigComponent } from './Containers/config/config.component';
import { AccountComponent } from './Containers/account/account.component';
import { StatisticsComponent } from './Containers/statistics/statistics.component';
import { PromotionComponent } from './Containers/promotion/promotion.component';
import { CategoryComponent } from './Containers/category/category.component';
import { OrderComponent } from './Containers/order/order.component';
import { ReservationComponent } from './Containers/reservation/reservation.component';
import { HomeComponent } from './customer-containers/home/home.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { LoginComponent } from './Containers/login/login.component';
import { StaffComponent } from './Containers/account/staff/staff.component';
import { CustomerComponent } from './Containers/account/customer/customer.component';
import { CustomerEditComponent } from './Containers/account/customer/customer-edit/customer-edit.component';
import { CustomerAddComponent } from './Containers/account/customer/customer-add/customer-add.component';
import { StaffEditComponent } from './Containers/account/staff/staff-edit/staff-edit.component';
import { RegisterCustomerComponent } from './customer-containers/register-customer/register-customer.component';
import { CustomerMenuComponent } from './customer-containers/customer-menu/customer-menu.component';
import { MenuComponent } from './Containers/menu/menu.component';
import { CustomerLoginComponent } from './customer-containers/customer-login/customer-login.component';
import { CustomerProfileComponent } from './customer-containers/customer-profile/customer-profile.component';
import { TableMapComponent } from './customer-containers/table-map/table-map.component';
import { CheckoutPageComponent } from './customer-containers/checkout-page/checkout-page.component';
import { ContactUsComponent } from './customer-containers/contact-us/contact-us.component';
import { LogoutComponent } from './customer-containers/logout/logout.component';



export const AppRoutes: Routes = [
    {
        // customer layount
        path: '',
        component: SiteLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                pathMatch: 'full'
            },
            {
                path: 'register',
                component: RegisterCustomerComponent
            },
            {
                path: 'menu',
                component: CustomerMenuComponent
            },
            {
                path: 'login',
                component: CustomerLoginComponent
            },
            {
                path: 'profile',
                component: CustomerProfileComponent
            },
            {
                path: 'reservation',
                component: TableMapComponent
            },
            {
                path: 'checkout',
                component: CheckoutPageComponent
            },
            {
                path: 'contactus',
                component: ContactUsComponent
            },
            {
                path: 'logout',
                component: LogoutComponent
            }
            // { path: 'about', component: AboutComponent }
        ]
    },

    {
        path: 'admin',
        component: AppLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'table',
                component: TableComponent
            },
            {
                path: 'config',
                component: ConfigComponent,
                children: [
                    {
                        path: 'social',
                        loadChildren: 'app/Containers/config/SocialMedia/social-media.module#SocialMediaModule'
                    }
                ],
                data: {
                    authorities: ['ROLE_USER', 'ROLE_ADMIN'],
                }
            },
            {
                path: '',
                children: [
                    {
                        path: 'account',
                        component: AccountComponent,
                    },
                    {
                        path: '',
                        children: [
                            {
                                path: 'account/staff',
                                component: StaffComponent
                            },
                            {
                                path: 'account/staff/add',
                                component: StaffEditComponent
                            },
                            {
                                path: 'account/staff/edit/:id',
                                component: StaffEditComponent
                            },
                            {
                                path: 'account/customer',
                                component: CustomerComponent
                            },
                            {
                                path: 'account/customer/edit/:id',
                                component: CustomerEditComponent
                            },
                            {
                                path: 'account/customer/add',
                                component: CustomerAddComponent
                            }
                        ]

                    }
                ]
            },
            {
                path: 'statistics',
                component: StatisticsComponent
            },
            {
                path: 'promotion',
                component: PromotionComponent
            },
            {
                path: 'category',
                component: CategoryComponent
            },
            {
                path: 'menu',
                component: MenuComponent
            },
            {
                path: 'Order',
                component: OrderComponent
            },
            {
                path: 'reservation',
                component: ReservationComponent
            }
        ]
    },
    {
        path: 'admin/login',
        component: LoginComponent,
    },
    // no layout routes
    // { path: 'login', component: LoginComponent},
    // { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
]
