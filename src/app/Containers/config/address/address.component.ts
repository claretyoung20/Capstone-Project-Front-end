import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { AddressService } from 'app/entities/services/address/address.service';
import { Address } from 'app/entities/interfaces/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  allAddress: Address[] = [];
  displayedColumns: string[] = ['id', 'city', 'country', 'restaurantId', 'street', 'contactNumber', 'supportEmail', 'edit'];
  dataSource;

  haveAddress = false;
  title = '';

  constructor(
    public dialog: MatDialog,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.getRestaurantAddress();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editAddress(id) {
    const title = 'Edit';
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      data: {
        addressId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getRestaurantAddress();
    });
  }

  addAddress() {
    const title = 'Add';
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      data: {
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getRestaurantAddress();
    });
  }

  getRestaurantAddress() {
    this.addressService.findAll().subscribe(res => {
      this.processToShow(res);
    });
  }

  processToShow(res) {
    if (Object.keys(res).length === 0) {
      this.haveAddress = false;
    } else {
      this.haveAddress = true;
      this.allAddress = res;
      this.dataSource = new MatTableDataSource(this.allAddress);
    }
  }
}
