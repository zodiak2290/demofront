import { TestBed } from '@angular/core/testing';

import { SocialIconService } from './social-icon.service';

describe('SocialIconService', () => {
  let service: SocialIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
