import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddressService } from 'app/entities/services/address/address.service';
import { Address } from 'app/entities/interfaces/address';


@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css']
})
export class AddressDialogComponent implements OnInit {

  title = '';
  id: any;
  isAddEditSection = false;
  isAdd = false;
  isEdit = false
  deleteSection = false;

  public adddressData: Address;

  addressForm: FormGroup;

  addressById: Address;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.buildForm();
    if (this.data.title === 'Add') {
      this.title = this.data.title;
      this.isAdd = true;
      this.isAddEditSection = true;
    }
    if (this.data.title === 'Edit') {
      this.title = this.data.title;
      this.isEdit = true;
      this.isAddEditSection = true;
      this.getAddressById(this.data.addressId);
    }
    if (this.data.title === 'Delete') {
      this.title = this.data.title;
      this.deleteSection = true;
    }
  }
  // build form
  buildForm() {
    this.addressForm = this.fb.group({
      id: [''],
      city: [''],
      street: ['', [Validators.required]],
      country: [''],
      contactNumber: [''],
      supportEmail: [''],
    })
  }

  getAddressById(id) {
    this.addressService.find(id).subscribe((addressData: Address) => {
      this.pathValue(addressData);
    })
  }

  pathValue(data) {
    this.addressForm.patchValue({
      id: data.id || '',
      street: data.street || '',
      city: data.city || '',
      country: data.country || '',
      contactNumber: data.contactNumber || '',
      supportEmail: data.supportEmail || '',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addAddress() {
    const data = this.addressForm.value;
    data.restaurantId = 1;
    this.addressService.create(data).subscribe(res => {
      this.dialogRef.close();
    });
  }

  editAddress() {
    const data = this.addressForm.value;
    data.id = this.data.addressId;
    data.restaurantId = 1;
    this.addressService.update(data).subscribe(res => {
      this.dialogRef.close();
    })
  }
  delete() {

  }
}
