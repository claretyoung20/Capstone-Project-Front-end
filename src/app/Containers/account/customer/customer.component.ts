import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'imageurl', 'createdDate', 'code', 'email', 'activated', 'edit', 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editStaff(id) {

  }

  cirnfirmDelete() {
  }

  openCustomerList() {
    this.router.navigate(['admin/account/customer/list']);
  }

}


export interface PeriodicElement {
  id: number;
  firstName: string;
  lastName: string;
  imageurl: string;
  createdDate: string;
  code: string;
  email: string;
  activated: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1,  firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 2,  firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH002', email: 'shh001@happy.com', activated: 'activited' },
  { id: 3,  firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH003', email: 'shh001@happy.com', activated: 'activited' },
  { id: 4,  firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH004', email: 'shh001@happy.com', activated: 'activited' },
  { id: 5,  firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH004', email: 'shh001@happy.com', activated: 'activited' },
  { id: 6,  firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 7,  firstName: 'Nnenna', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 8,  firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 9,  firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 10, firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 11, firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 12, firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 13, firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 14, firstName: 'Ihechi', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 15, firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 16, firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 17, firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 18, firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 19, firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
  { id: 20, firstName: 'Gold', lastName: 'Ihesiaba', imageurl: 'ss', createdDate: '2018-10-30'
  , code: 'SHH001', email: 'shh001@happy.com', activated: 'activited' },
];
