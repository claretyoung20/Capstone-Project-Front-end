import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataThumb1 = 'http://localhost:4200/assets/revolution/assets/100x50_a617d-slider2-bg.jpg';
  dataThumb2 = 'http://localhost:4200/assets/revolution/assets/100x50_a617d-slider2-bg.jpg';
  constructor() { }

  ngOnInit() {
  }

}
