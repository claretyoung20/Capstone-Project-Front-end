import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CartService } from 'app/entities/services/cart/cart.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-remove-confirm',
  templateUrl: './remove-confirm.component.html',
  styleUrls: ['./remove-confirm.component.css']
})
export class RemoveConfirmComponent implements OnInit {

  itemId: number;
  constructor(
    private cartServices: CartService,
    public dialogRef: MatDialogRef<RemoveConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
   this.itemId = this.data.itemId;
  }

  cancel() {
    this.dialogRef.close();
  }

  remove() {
    if (this.itemId) {
      this.cartServices.delete(this.itemId).subscribe(res => {
        console.log('delete successful');
        this.dialogRef.close();
      })
    }
  }
}
