import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HhSocialService } from 'app/entities/services/hh-social/hh-social.service';
import { SocialMedia } from 'app/entities/interfaces/socialMedia.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-socialDialog',
  templateUrl: './socialDialog.component.html',
  styleUrls: ['./socialDialog.component.css']
})
export class SocialDialogComponent implements OnInit {

  title = '';
  id: any;
  isAddEditSection = false;
  isAdd = false;
  isEdit = false
  deleteSection = false;
  imgSrc = '';

  socialMediaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SocialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private socialMediaService: HhSocialService
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
      console.log(this.data.socialMediaId);
      this.getSocialMediaById(this.data.socialMediaId);
    }
    if (this.data.title === 'Delete') {
      this.title = this.data.title;
      this.deleteSection = true;
    }
  }
  // build form
  buildForm() {
    this.socialMediaForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      link: [''],
    })
  }

  getSocialMediaById(id) {
    this.socialMediaService.find(id).subscribe((socialMediaData: SocialMedia) => {
      this.pathValue(socialMediaData);
    })
  }
  pathValue(data) {
    this.socialMediaForm.patchValue({
      id: data.id || '',
      name: data.name || '',
    });
    this.imgSrc = data.link;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addSocial() {
    const data = this.socialMediaForm.value;
    data.restaurantId = 1;
    this.socialMediaService.create(data).subscribe(res => {
      this.dialogRef.close();
    });
  }

  editSocial() {
    const data = this.socialMediaForm.value;
    data.id = this.data.socialMediaId;
    data.restaurantId = 1;
    this.socialMediaService.update(data).subscribe(res => {
      this.dialogRef.close();
    })
  }

  delete() {
    this.socialMediaService.delete(this.data.socialMediaId).subscribe(res => {
      this.dialogRef.close();
    })
  }
}
