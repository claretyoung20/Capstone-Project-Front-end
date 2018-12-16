import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/core';
import { AppLayoutComponent } from 'app/_layout/app-layout/app-layout.component';
import { CURRENTADMINROLE } from 'app/static/constants/site.constants';
import { Router } from '@angular/router';

declare var $: any;

export interface RouteInfo {
    user: string,
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {user: 'ROLE_ADMIN', path: '/admin/dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    {user: 'ROLE_ADMIN', path: 'profile', title: 'My Profile',  icon: 'ti-user', class: '' },
    {user: 'ROLE_ADMIN', path: '/admin/config', title: 'Manage Configuration',  icon: 'ti-settings', class: '' },
    {user: 'ROLE_ADMIN', path: '/admin/account', title: 'Manage Account',  icon: 'ti-user', class: '' },

    {user: 'ROLE_MANAGER', path: '/admin/dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    {user: 'ROLE_MANAGER', path: 'profile', title: 'My Profile',  icon: 'ti-user', class: '' },
    {user: 'ROLE_MANAGER', path: 'table', title: 'Table List',  icon: 'ti-view-list-alt', class: '' },
    {user: 'ROLE_MANAGER', path: '/admin/promotion', title: 'Manage Promotion',  icon: 'ti-plus ', class: '' },
    {user: 'ROLE_MANAGER', path: '/admin/category', title: 'Manage Category',  icon: 'ti-view-list-alt', class: '' },
    {user: 'ROLE_MANAGER', path: '/admin/menu', title: 'Manage Menu',  icon: 'ti-menu-alt', class: '' },

    {user: 'ROLE_STAFF', path: '/admin/dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    {user: 'ROLE_STAFF', path: 'profile', title: 'My Profile',  icon: 'ti-user', class: '' },
    {user: 'ROLE_STAFF', path: '/admin/statistics', title: 'sales',  icon: 'ti-stats-up', class: '' },
    {user: 'ROLE_STAFF', path: '/admin/Order', title: 'Process Order',  icon: 'ti-shopping-cart-full', class: '' },
    {user: 'ROLE_STAFF', path: '/admin/reservation', title: 'Process Reservation',  icon: 'ti-crown', class: '' }
];

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    userRole: string;
    constructor(
        private app: AppLayoutComponent,
        private router: Router
    ) {
    }
    ngOnInit() {
        this.userRole = localStorage.getItem(CURRENTADMINROLE) || 'non';
        console.log('currently' + this.userRole);

        if (this.userRole !== 'non') {
            this.menuItems = ROUTES.filter(menuItem => menuItem.user === this.userRole);
            console.log('menu => ' + this.menuItems);
        } else {
             // return to home page
            this.router.navigate(['/admin/login']);
        }
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
