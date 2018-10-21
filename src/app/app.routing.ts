import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { SocialMediaComponent } from './Containers/Config/SocialMedia/social-media.component';
import { CustomerComponent } from './Containers/Customers/customer/customer.component';
import { ConfigComponent } from './Containers/Config/config.component';
import { AccountComponent } from './Containers/account/account.component';
import { StatisticsComponent } from './Containers/statistics/statistics.component';
import { PromotionComponent } from './Containers/promotion/promotion.component';
import { CategoryComponent } from './Containers/category/category.component';
import { MenuComponent } from './Containers/menu/menu.component';
import { OrderComponent } from './Containers/order/order.component';
import { ReservationComponent } from './Containers/reservation/reservation.component';
import { HomeComponent } from './customer-containers/home/home.component';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';




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
        path: '',
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
                path: 'cofig',
                component: ConfigComponent
            },
            {
                path: 'account',
                component: AccountComponent
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
    // no layout routes
    // { path: 'login', component: LoginComponent},
    // { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
]
