import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerService } from 'app/entities/services/customer/customer.service';

@Component({
  selector: 'app-conform-delete-dialog',
  templateUrl: './conform-delete-dialog.component.html',
  styleUrls: ['./conform-delete-dialog.component.css']
})
export class ConformDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConformDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
  }

  delete() {
    this.customerService.delete(this.data.customerId).subscribe(() => {
      this.dialogRef.close();
    })
  }
}
