import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogContentComponent } from 'app/shared/Dialog/dialog-content/dialog-content.component';


export interface PeriodicElement {
  id: number,
  day: string;
  openingTime: string;
  closingTime: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, day: 'Monday', openingTime: '7:0 AM', closingTime: '9:00 PM' },
  {id: 2, day: 'Tuesday', openingTime: '7:0 AM', closingTime: '9:00 PM' },
  {id: 3, day: 'Wednesday', openingTime: '7:0 AM', closingTime: '9:30 PM' },
  {id: 4, day: 'Thursday', openingTime: '7:0 AM', closingTime: '9:00 PM' },
  {id: 5, day: 'Friday', openingTime: '7:0 AM', closingTime: '9:00 PM' },
  {id: 6, day: 'Saturday', openingTime: '7:0 AM', closingTime: '10:00 PM' },
  {id: 7, day: 'Sunday', openingTime: '7:0 AM', closingTime: '11:00 PM' },
];

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.component.html',
  styleUrls: ['./time-manager.component.css']
})
export class TimeManagerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'day', 'openingTime', 'closingTime', 'edit', 'delete' ];
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
