import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { DialogContentComponent } from '../../../shared/Dialog/dialog-content/dialog-content.component'
import {MatDialog} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  logo: string;
  edit: string;
  delete: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Facebook', logo: '../../../../assets/img/socialMedia.jpg', edit: '', delete: ''},
  {position: 2, name: 'Instagram', logo: '../../../../assets/img/socialMedia.jpg', edit: '', delete: ''},
  {position: 3, name: 'Twitter', logo: '../../../../assets/img/socialMedia.jpg', edit: '', delete: ''},
  {position: 4, name: 'YouTube', logo: '../../../../assets/img/socialMedia.jpg', edit: '', delete: ''},
  {position: 5, name: 'Skype', logo: '../../../../assets/img/socialMedia.jpg', edit: '', delete: ''},
  {position: 6, name: 'SnapChat', logo: '../../../../assets/img/socialMedia.jpg', edit: '', delete: ''}
];

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})

export class SocialMediaComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'logo', 'edit', 'delete'];
  dataSource;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
