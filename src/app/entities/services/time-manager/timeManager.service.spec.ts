/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimeManagerService } from './timeManager.service';

describe('Service: TimeManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeManagerService]
    });
  });

  it('should ...', inject([TimeManagerService], (service: TimeManagerService) => {
    expect(service).toBeTruthy();
  }));
});
