/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SaleOrderService } from './sale-order.service';

describe('Service: SaleOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaleOrderService]
    });
  });

  it('should ...', inject([SaleOrderService], (service: SaleOrderService) => {
    expect(service).toBeTruthy();
  }));
});
