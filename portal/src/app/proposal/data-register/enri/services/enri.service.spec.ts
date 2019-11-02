import { TestBed } from '@angular/core/testing';

import { EnriService } from './enri.service';

describe('EnriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnriService = TestBed.get(EnriService);
    expect(service).toBeTruthy();
  });
});
