import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { SocialMediaComponent } from './Containers/Config/SocialMedia/social-media/social-media.component';
import { CustomerComponent } from './Containers/Customers/customer/customer.component';

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
        component: SocialMediaComponent
    },
    {
        path: 'customers',
        component: CustomerComponent
    }
]
