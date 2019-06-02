import { TestBed } from '@angular/core/testing';

import { GLOBAL } from './global.service';

describe('GlobalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GLOBAL = TestBed.get(GLOBAL);
    expect(service).toBeTruthy();
  });
});
