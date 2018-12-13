import { Address } from 'app/entities/interfaces/address';
import { AddressService } from './../../entities/services/address/address.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  address: Address[] = [];

  constructor(
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this. getAllAdress();
  }
  getAllAdress() {
    this.addressService.findAll().subscribe( res => {
      console.log(res);
      this.address = res;
    })
  }
}
