import { TestBed, async, inject } from '@angular/core/testing';

import { PhaseGuard } from './phase.guard';

describe('PhaseGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhaseGuard]
    });
  });

  it('should ...', inject([PhaseGuard], (guard: PhaseGuard) => {
    expect(guard).toBeTruthy();
  }));
});
