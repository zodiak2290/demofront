import { TestBed } from '@angular/core/testing';

import { FeedsService } from './feeds.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeedsService', () => {
  let service: FeedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule  // <-- Se agrega al array de imports
      ],
    });
    service = TestBed.inject(FeedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
