import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/core';
import { AppLayoutComponent } from 'app/_layout/app-layout/app-layout.component';

declare var $: any;

export interface RouteInfo {
    user: string,
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {user: 'admin', path: '/admin/dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    {user: 'staff', path: 'user', title: 'User Profile',  icon: 'ti-user', class: '' },
    {user: 'admin', path: '/admin/config', title: 'Manage Configuration',  icon: 'ti-settings', class: '' },
    {user: 'admin', path: '/admin/account', title: 'Manage Account',  icon: 'ti-user', class: '' },
    {user: 'manager', path: 'table', title: 'Table List',  icon: 'ti-view-list-alt', class: '' },
    {user: 'manager', path: '/admin/promotion', title: 'Manage Promotion',  icon: 'ti-plus ', class: '' },
    {user: 'manager', path: '/admin/category', title: 'Manage Category',  icon: 'ti-view-list-alt', class: '' },
    {user: 'manager', path: '/admin/menu', title: 'Manage Menu',  icon: 'ti-menu-alt', class: '' },
    {user: 'staff', path: '/admin/statistics', title: 'Statistics',  icon: 'ti-stats-up', class: '' },
    {user: 'staff', path: '/admin/Order', title: 'Process Order',  icon: 'ti-shopping-cart-full', class: '' },
    {user: 'staff', path: '/admin/reservation', title: 'Process Reservation',  icon: 'ti-crown', class: '' }
];

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(private app: AppLayoutComponent) {
    }
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    getAccountType() {
       return 'admin';
    }

}
