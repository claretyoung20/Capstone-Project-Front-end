import { Component, OnInit } from '@angular/core';

declare var $: any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    // { path: 'user', title: 'User Profile',  icon: 'ti-user', class: '' },
    // { path: 'table', title: 'Table List',  icon: 'ti-view-list-alt', class: '' },
    { path: '/admin/config', title: 'Manage Configuration',  icon: 'ti-settings', class: '' },
    { path: '/admin/account', title: 'Manage Account',  icon: 'ti-user', class: '' },
    // { path: '/admin/statistics', title: 'Statistics',  icon: 'ti-stats-up', class: '' },
    // { path: '/admin/promotion', title: 'Manage Promotion',  icon: 'ti-plus ', class: '' },
    // { path: '/admin/category', title: 'Manage Category',  icon: 'ti-view-list-alt', class: '' },
    // { path: '/admin/menu', title: 'Manage Menu',  icon: 'ti-menu-alt', class: '' },
    // { path: '/admin/Order', title: 'Process Order',  icon: 'ti-shopping-cart-full', class: '' },
    // { path: '/admin/reservation', title: 'Process Reservation',  icon: 'ti-crown', class: '' }
];

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

}
