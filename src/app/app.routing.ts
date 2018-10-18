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

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
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
