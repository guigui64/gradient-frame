import { TestBed } from '@angular/core/testing';

import { GradientFrameApiService } from './gradient-frame-api.service';

describe('GradientFrameApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GradientFrameApiService = TestBed.get(GradientFrameApiService);
    expect(service).toBeTruthy();
  });
});
