import { Component, OnInit } from '@angular/core';

declare var $: any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    // { path: 'user', title: 'User Profile',  icon: 'ti-user', class: '' },
    // { path: 'table', title: 'Table List',  icon: 'ti-view-list-alt', class: '' },
    { path: 'cofig', title: 'Manage Configuration',  icon: 'ti-settings', class: '' },
    { path: 'account', title: 'Manage Account',  icon: 'ti-user', class: '' },
    { path: 'Statistics', title: 'Statistics',  icon: 'ti-stats-up', class: '' },
    { path: 'promotion', title: 'Manage Promotion',  icon: 'ti-plus', class: '' },
    { path: 'category', title: 'Manage Category',  icon: 'ti-view-list-alt', class: '' },
    { path: 'menu', title: 'Manage Menu',  icon: 'ti-menu-alt', class: '' },
    { path: 'Order', title: 'Process Order',  icon: 'ti-shopping-cart-full', class: '' },
    { path: 'reservation', title: 'Process Reservation',  icon: 'ti-crown', class: '' }
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
