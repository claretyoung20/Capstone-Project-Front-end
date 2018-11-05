import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TimeManagerDialogComponent } from './time-manager-dialog/time-manager-dialog.component';
import { TimeManagerService } from 'app/entities/services/time-manager/timeManager.service';

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.component.html',
  styleUrls: ['./time-manager.component.css']
})
export class TimeManagerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'day', 'startTime',  'endTime', 'edit', 'delete'];
  dataSource;

  constructor(
    public dialog: MatDialog,
    private timeManagerService: TimeManagerService
  ) { }

  ngOnInit() {
    this.getListTimeManager();
  }

  // get all social media
  getListTimeManager() {
    this.timeManagerService.findAll().subscribe(res => {
      this.processToShow(res);
    });
  }
  processToShow(res) {
    this.dataSource = new MatTableDataSource(res);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // Add new Social Media
  addSocialMedia() {
    const title = 'Add';
    const dialogRef = this.dialog.open(TimeManagerDialogComponent, {
      data: {
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getListTimeManager();
    });
  }


  // Edit Social Media
  editSocialMedia(id) {
    const title = 'Edit';
    const dialogRef = this.dialog.open(TimeManagerDialogComponent, {
      data: {
        timeId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getListTimeManager();
    });
  }

  // Delete Social Media
  deleteSocialMedia(id): void {
    const title = 'Delete';
    const dialogRef = this.dialog.open(TimeManagerDialogComponent, {
      data: {
        timeId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getListTimeManager();
    });
  }
}
