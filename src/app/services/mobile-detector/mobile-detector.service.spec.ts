import { TestBed } from '@angular/core/testing';

import { MobileDetectorService } from './mobile-detector.service';

describe('MobileDetectorService', () => {
  let service: MobileDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect mobile when window width is less than or equal to 768', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(768);
    window.dispatchEvent(new Event('resize'));
    expect(service.isMobile).toBeTrue();
  });

  it('should detect non-mobile when window width is greater than 768', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(769);
    window.dispatchEvent(new Event('resize'));
    expect(service.isMobile).toBeFalse();
  });

  it('should emit true on isMobile$ when window width is less than or equal to 768', (done) => {
    spyOnProperty(window, 'innerWidth').and.returnValue(768);
    window.dispatchEvent(new Event('resize'));
    service.isMobile$.subscribe((isMobile) => {
      expect(isMobile).toBeTrue();
      done();
    });
  });

  it('should emit false on isMobile$ when window width is greater than 768', (done) => {
    spyOnProperty(window, 'innerWidth').and.returnValue(769);
    window.dispatchEvent(new Event('resize'));
    service.isMobile$.subscribe((isMobile) => {
      expect(isMobile).toBeFalse();
      done();
    });
  });
});
