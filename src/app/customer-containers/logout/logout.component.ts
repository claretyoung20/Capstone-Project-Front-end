import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISCUSTOMERLOGGED, LOCALSTORAGEFORCUSTOMER } from 'app/static/constants/site.constants';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.removeItem(ISCUSTOMERLOGGED);
    localStorage.removeItem(LOCALSTORAGEFORCUSTOMER);
    this.router.navigate(['/']);
  }

}
