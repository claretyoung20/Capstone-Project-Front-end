import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import {SaleOrderService} from '../../entities/services/saleOrder/sale-order.service';
import {SaleOrder} from '../../entities/interfaces/saleOrder';
import {ProductService} from '../../entities/services/product/product.service';
import {Product} from '../../entities/interfaces/product';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  saleOrders: SaleOrder[] = [];
  products: Product[] = [];
  allChartData: ChartValue[] = [];
  constructor(
      private saleOrderServices: SaleOrderService,
      private productService: ProductService
  ) { }

  ngOnInit() {
      this.getAllProduct();
      this.getCharValue();
  }

  getAllProduct() {
      this.productService.noPaging().subscribe( res => {
          this.products = res;
      })
  }

  getCharValue() {
      this.saleOrderServices.getChart().subscribe( res => {
          this.processChart(res);
          console.log('jjjj')
          console.log(res)
      })
  }
  processChart(res: any) {

      const chart = new CanvasJS.Chart('chartContainer', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
              text: 'HappyHour top sales Report'
          },
          data: [{
              type: 'column',
              dataPoints: []
          }]
      });
      chart.render();

      this.saleOrders = res;
      let sale = 0;
      for (sale ; sale < this.saleOrders.length; sale++) {
          console.log('ssssss ' + sale);
              // newData.y = this.saleOrders[sale].basePrice;
              let label = this.getProductName(this.saleOrders[sale].productId);
              // this.allChartData.push(newData);

          chart.options.data[0].dataPoints.push({ y: this.saleOrders[sale].basePrice, label: label});
          }

      chart.render();
      }


  getProductName(id) {
      let product;
      let name;
      for (product in this.products) {
          if (this.products[product].id === id) {
            name =  this.products[product].name;
             break;
          }
      }
      return name;
  }


  chart() {
      this.getCharValue();
      const chart = new CanvasJS.Chart('chartContainer', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
              text: 'HappyHour top sales Report'
          },
          data: [{
              type: 'column',
              dataPoints: []
          }]
      });


      // chart.render();
      // let dd;
      // for (dd in this.allChartData) {
      //     console.log('ssssss ' + dd);
      //     chart.options.data[dd].dataPoints.push({ y: 25 - Math.random() * 10});
      // }

      chart.render();
  }


}

export interface ChartValue {
    y?: number;
    label?: string
}

