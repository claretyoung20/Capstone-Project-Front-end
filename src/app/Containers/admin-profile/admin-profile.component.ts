import { Component, OnInit } from '@angular/core';
import { User } from 'app/entities/interfaces/user';
import {AccountStaffService} from '../../entities/services/account/account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

    user: User;
    isSaving: boolean;

    constructor(
        private userService: AccountStaffService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.getCurrentUser();

    }

    getCurrentUser() {
      this.userService.findAccountById(8).subscribe( res => {
          this.user = res;
      })
    }

    previousState() {
        this.router.navigate(['/admin/user-management']);
    }

    save() {
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

}
