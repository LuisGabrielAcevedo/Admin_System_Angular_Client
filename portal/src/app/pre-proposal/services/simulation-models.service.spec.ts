import { TestBed } from '@angular/core/testing';

import { SimulationModelsService } from './simulation-models.service';

describe('SimulationModelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimulationModelsService = TestBed.get(
      SimulationModelsService
    );
    expect(service).toBeTruthy();
  });
});
