import { IHHSocialMedia } from './../../../entities/model/hh-social-media.model';
import { HhSocialService } from './../../../entities/services/hh-social/hh-social.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SocialDialogComponent } from './socialDialog/socialDialog.component';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})

export class SocialMediaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'link', 'name', 'restaurantId', 'edit', 'delete'];
  dataSource;

  constructor(
    public dialog: MatDialog,
    private socialSevice: HhSocialService
  ) { }

  ngOnInit() {
    this.getAllSocialMedia();
  }

  getAllSocialMedia() {
    this.socialSevice.findAll().subscribe(res => {
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
    const dialogRef = this.dialog.open(SocialDialogComponent, {
      data: {
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllSocialMedia()
    });
  }


  // Edit Social Media
  editSocialMedia(id) {
    const title = 'Edit';
    const dialogRef = this.dialog.open(SocialDialogComponent, {
      data: {
        socialMediaId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllSocialMedia()
    });
  }


  // Delete Social Media
  deleteSocialMedia(id): void {
    const title = 'Delete';
    const dialogRef = this.dialog.open(SocialDialogComponent, {
      data: {
        socialMediaId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllSocialMedia()
    });
  }

}
