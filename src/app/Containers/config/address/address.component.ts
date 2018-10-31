import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogContentComponent } from 'app/shared/Dialog/dialog-content/dialog-content.component';

export interface PeriodicElement {
  id: number,
  street: string;
  city: string;
  country: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, street: '18 Cau giay', city: 'Hanoi', country: 'Vietnam' },
];

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  displayedColumns: string[] = ['id', 'street', 'city', 'country', 'edit' ];
  dataSource;

  constructor(
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    // this.getAllSocialMedia() ;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  edit(id) {

  }

}
