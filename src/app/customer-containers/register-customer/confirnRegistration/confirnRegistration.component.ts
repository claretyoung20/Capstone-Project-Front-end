import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirn-registration',
  templateUrl: './confirnRegistration.component.html',
  styleUrls: ['./confirnRegistration.component.css']
})
export class ConfirnRegistrationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirnRegistrationComponent>,
  ) { }

  ngOnInit() {
  }

ok() {
  this.dialogRef.close();
}

}
