import { TestBed } from '@angular/core/testing';

import { EnriStatusService } from './enri-status.service';

describe('EnriStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnriStatusService = TestBed.get(EnriStatusService);
    expect(service).toBeTruthy();
  });
});
