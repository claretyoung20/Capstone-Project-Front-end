import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { ConfigComponent } from './Containers/config/config.component';
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
import { LoginComponent } from './Containers/login/login.component';
import { StaffComponent } from './Containers/account/staff/staff.component';
import { ListStaffComponent } from './Containers/account/staff/list-staff/list-staff.component';
import { CustomerListComponent } from './Containers/account/customer/customer-list/customer-list.component';
import { CustomerComponent } from './Containers/account/customer/customer.component';




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
                                path: 'account/staff/list',
                                component: ListStaffComponent
                            },
                            {
                                path: 'account/customer',
                                component: CustomerComponent
                            },
                            {
                                path: 'account/customer/list',
                                component: CustomerListComponent
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
