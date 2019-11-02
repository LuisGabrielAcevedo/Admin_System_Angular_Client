import { TestBed } from '@angular/core/testing';

import { SellingPointService } from './selling-point.service';

describe('SellingPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellingPointService = TestBed.get(SellingPointService);
    expect(service).toBeTruthy();
  });
});
