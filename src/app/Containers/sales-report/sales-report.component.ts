import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      this.chart();
  }

  chart() {

      const chart = new CanvasJS.Chart('chartContainer', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
              text: 'HappyHour top sales Report'
          },
          data: [{
              type: 'column',
              dataPoints: [
                  { y: 71, label: 'Apple' },
                  { y: 55, label: 'Mango' },
                  { y: 50, label: 'Orange' },
                  { y: 65, label: 'Banana' },
                  { y: 95, label: 'Pineapple' },
                  { y: 68, label: 'Pears' },
                  { y: 28, label: 'Grapes' },
                  { y: 34, label: 'Lychee' },
                  { y: 14, label: 'Jackfruit' },
                  { y: 95, label: 'Pinegggapple' },
                  { y: 68, label: 'Peargggs' },
                  { y: 28, label: 'Grapes' },
                  { y: 34, label: 'Lychee' },
                  { y: 14, label: 'ggg' },
                  { y: 95, label: 'Pgggineapple' },
                  { y: 68, label: 'Pears' },
                  { y: 28, label: 'Grapggges' },
                  { y: 134, label: 'Lychgggee' },
                  { y: 54, label: 'Jackgggfruit' },
                  { y: 97, label: 'Pineagggpple' },
                  { y: 38, label: 'Pggggears' },
                  { y: 68, label: 'Grggggapes' },
                  { y: 54, label: 'Lycgghee' },
                  { y: 34, label: 'Jackggfruit' },
                  { y: 71, label: 'Apple' },
                  { y: 55, label: 'Mango' },
                  { y: 50, label: 'Orange' },
                  { y: 65, label: 'Banana' },
                  { y: 95, label: 'Pineapple' },
                  { y: 68, label: 'Pears' },
                  { y: 28, label: 'Grapes' },
                  { y: 34, label: 'Lychee' },
                  { y: 14, label: 'Jackfruit' },
                  { y: 95, label: 'Pinegggapple' },
                  { y: 68, label: 'Peargggs' },
                  { y: 28, label: 'Grapes' },
                  { y: 34, label: 'Lychee' },
                  { y: 14, label: 'ggg' },
                  { y: 95, label: 'Pgggineapple' },
                  { y: 68, label: 'Pears' },
                  { y: 28, label: 'Grapggges' },
                  { y: 134, label: 'Lychgggee' },
                  { y: 54, label: 'Jackgggfruit' },
                  { y: 97, label: 'Pineagggpple' },
                  { y: 38, label: 'Pggggears' },
                  { y: 68, label: 'Grggggapes' },
                  { y: 54, label: 'Lycgghee' },
                  { y: 34, label: 'Jackggfruit' }
              ]
          }]
      });

      chart.render();
  }

}

