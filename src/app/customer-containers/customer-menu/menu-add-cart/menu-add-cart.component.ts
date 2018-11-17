import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-add-cart',
  templateUrl: './menu-add-cart.component.html',
  styleUrls: ['./menu-add-cart.component.css']
})
export class MenuAddCartComponent implements OnInit {

  customerId: number;
  isCustomerLoggedIn: Boolean;
  isCart = false;
  isLogin = false;

  constructor(
    public dialogRef: MatDialogRef<MenuAddCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.data.title === 'auth') {
     this.isLogin = true;
    }

    if (this.data.title === 'message') {
      this.isCart = true;
    }
  }

  checkOut() {
    this.dialogRef.close();
    this.router.navigate(['/checkout']);
  }

  Cancel() {
    this.dialogRef.close();
    this.router.navigateByUrl('/menu');
  }

  login() {
    this.dialogRef.close();
    window.location.reload();
  }

  register() {
    this.dialogRef.close();
    this.router.navigate(['/register']);
  }
}
