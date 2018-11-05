import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Days } from './../../../../entities/interfaces/days'
import { TimeManagerService } from 'app/entities/services/time-manager/timeManager.service';
import { TimeManager } from 'app/entities/interfaces/timeManager';

@Component({
  selector: 'app-time-manager-dialog',
  templateUrl: './time-manager-dialog.component.html',
  styleUrls: ['./time-manager-dialog.component.css']
})
export class TimeManagerDialogComponent implements OnInit {

  title = '';
  id: any;
  isAddEditSection = false;
  isAdd = false;
  isEdit = false
  deleteSection = false;

  timeManagerForm: FormGroup;

  // days of the weeks
  dayOfWeeks: Days[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TimeManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private timeManagerService: TimeManagerService
  ) { }

  ngOnInit() {
    this.getAllDays();
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
      this.getTimeById(this.data.timeId);
    }
    if (this.data.title === 'Delete') {
      this.title = this.data.title;
      this.deleteSection = true;
    }
  }
  getAllDays() {
    this.dayOfWeeks = [
      { value: 'Monday', viewValue: 'Monday' },
      { value: 'Tuesday', viewValue: 'Tuesday' },
      { value: 'Wednesday', viewValue: 'Wednesday' },
      { value: 'Thursday', viewValue: 'Thursday' },
      { value: 'Friday', viewValue: 'Friday' },
      { value: 'Saturday', viewValue: 'Saturday' },
      { value: 'Sunday', viewValue: 'Sunday' }
    ];
  }

  // build form
  buildForm() {
    this.timeManagerForm = this.fb.group({
      id: [''],
      day: ['', [Validators.required]],
      startTime: [''],
      endTime: ['']
    })
  }

  getTimeById(id) {
    this.timeManagerService.find(id).subscribe((timeManager: TimeManager) => {
      this.pathValue(timeManager);
    })
  }
  pathValue(data) {
    this.timeManagerForm.patchValue({
      id: data.id || '',
      day: data.day || '',
      startTime: data.startTime || '',
      endTime: data.endTime || '',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addSocial() {
    const data = this.timeManagerForm.value;
    data.restaurantId = 1;
    this.timeManagerService.create(data).subscribe(() => {
      this.dialogRef.close();
    });
  }

  editSocial() {
    const data = this.timeManagerForm.value;
    data.id = this.data.timeId;
    data.restaurantId = 1;
    this.timeManagerService.update(data).subscribe(() => {
      this.dialogRef.close();
    })
  }

  delete() {
    this.timeManagerService.delete(this.data.timeId).subscribe(() => {
      this.dialogRef.close();
    })
  }

}
