import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  constructor(
    private app: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.app.authenticated);
   this.authenticated();
  }
  authenticated() {
    if (!this.app.authenticated) {
      this.router.navigateByUrl('/admin/login');
    }
  }
}
