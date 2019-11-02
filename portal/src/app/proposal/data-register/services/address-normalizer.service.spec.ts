import { TestBed } from '@angular/core/testing';

import { AddressNormalizerService } from './address-normalizer.service';

describe('AddressNormalizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressNormalizerService = TestBed.get(
      AddressNormalizerService
    );
    expect(service).toBeTruthy();
  });
});
