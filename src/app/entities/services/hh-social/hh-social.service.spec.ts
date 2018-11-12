import { TestBed } from '@angular/core/testing';

import { HhSocialService } from './hh-social.service';

describe('HhSocialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HhSocialService = TestBed.get(HhSocialService);
    expect(service).toBeTruthy();
  });
});
