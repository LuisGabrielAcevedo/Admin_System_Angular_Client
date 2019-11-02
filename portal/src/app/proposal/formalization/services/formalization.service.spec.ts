import { TestBed } from '@angular/core/testing';

import { FormalizationService } from './formalization.service';

describe('FormalizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormalizationService = TestBed.get(FormalizationService);
    expect(service).toBeTruthy();
  });
});
