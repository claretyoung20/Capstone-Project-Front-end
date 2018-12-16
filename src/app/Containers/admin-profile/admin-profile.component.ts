import { Component, OnInit } from '@angular/core';
import { User } from 'app/entities/interfaces/user';
import {AccountStaffService} from '../../entities/services/account/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CURRENTSTAFFORADMINID, LOCALSTORAGEFORCUSTOMER} from '../../static/constants/site.constants';
import {UserService} from '../../entities/model/user/user.service';
import {MenuDialogComponent} from '../menu/menu-dialog/menu-dialog.component';
import {AlertSuccessComponent} from './alert-success/alert-success.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

    user: User;
    isSaving: boolean;

    userId: number;
    constructor(
        private userService: AccountStaffService,
        private userServices2: UserService,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.userId = JSON.parse(localStorage.getItem(CURRENTSTAFFORADMINID) || '0');
        this.getCurrentUser();
    }

    getCurrentUser() {
        this.user = {};
        if (this.userId !== 0) {
            this.userService.findAccountById(this.userId).subscribe( res => {
                this.user = res;
            })
        }
    }

    previousState() {
        this.router.navigate(['/admin/user-management']);
    }

    save() {
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userServices2.update(this.user).subscribe(
                response => this.onSaveSuccess(response),
                () => this.onSaveError());
        }
    }

    private onSaveSuccess(resultk) {
        this.isSaving = false;
        // open dalog
        const title = 'Delete';
        const dialogRef = this.dialog.open(AlertSuccessComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    private onSaveError() {
        this.isSaving = false;
        console.log('error')
    }

}
