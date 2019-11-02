import { TestBed } from '@angular/core/testing';

import { ManageableRejectionService } from './manageable-rejection.service';

describe('ManageableRejectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageableRejectionService = TestBed.get(
      ManageableRejectionService
    );
    expect(service).toBeTruthy();
  });
});
