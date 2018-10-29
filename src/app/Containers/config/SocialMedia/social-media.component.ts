import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IHHSocialMedia } from './../../../entities/model/hh-social-media.model';
import { HhSocialService } from './../../../entities/services/hh-social/hh-social.service';
import { HhSocial } from './../../../entities/interfaces/hh-social.interface';
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

  socials: IHHSocialMedia[] = [];

  displayedColumns: string[] = ['position', 'name', 'logo', 'edit', 'delete'];
  dataSource;

  constructor(
    public dialog: MatDialog,
    private socialSevice: HhSocialService
    ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    // this.getAllSocialMedia() ;
  }
  getAllSocialMedia() {
    this.socialSevice
            .query()
            .subscribe(
                (res: HttpResponse<IHHSocialMedia[]>) => this.paginateHHSocialMedias(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
  }
  processToShow(res) {
    this.socialSevice = res.content;
    console.log(this.socialSevice);
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

  private onError(errorMessage: string) {
   console.log(errorMessage, null, null);
  }

  private paginateHHSocialMedias(data: IHHSocialMedia[], headers: HttpHeaders) {
    this.socials = data;
  }

}
