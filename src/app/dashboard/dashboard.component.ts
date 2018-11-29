import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { CURRENTADMINROLE } from 'app/static/constants/site.constants';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  userRole: string;

  constructor (
    private router: Router
    ) { }

    ngOnInit() {

      this.userRole = localStorage.getItem(CURRENTADMINROLE) || 'non';
        console.log('currently' + this.userRole);

        if (this.userRole === 'non') {
          this.router.navigate(['/admin/login']);
        }
        const dataSales = {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [
             [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
          ]
        };

        const optionsSales = {
          low: 0,
          high: 1000,
          showArea: true,
          height: '245px',
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false,
        };

        const responsiveSales: any[] = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        // tslint:disable-next-line:no-unused-expression
        new Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


        const data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        };

        const options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: '245px'
        };

        const responsiveOptions: any[] = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        // tslint:disable-next-line:no-unused-expression
        new Chartist.Line('#chartActivity', data, options, responsiveOptions);

        const dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };

        const optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        // tslint:disable-next-line:no-unused-expression
        new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

        // tslint:disable-next-line:no-unused-expression
        new Chartist.Pie('#chartPreferences', {
          labels: ['62%', '32%', '6%'],
          series: [62, 32, 6]
        });
    }
}
