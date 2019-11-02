import { TestBed } from '@angular/core/testing';

import { OnBoardingService } from './onboarding.service';

describe('OnBoardingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnBoardingService = TestBed.get(OnBoardingService);
    expect(service).toBeTruthy();
  });
});
