/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableTypeService } from './table-type.service';

describe('Service: TableType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableTypeService]
    });
  });

  it('should ...', inject([TableTypeService], (service: TableTypeService) => {
    expect(service).toBeTruthy();
  }));
});
