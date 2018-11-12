import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditCustomerAccountComponent } from './edit-customer-account/edit-customer-account.component';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openEditProfile() {
    const title = 'Delete';
    const dialogRef = this.dialog.open(EditCustomerAccountComponent, {
      data: {
        customerId: 1,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }


}
