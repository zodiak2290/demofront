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

  it('should detect mobile when window width is less than the breakpoint', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1200);
    service.isMobile$.subscribe((isMobile) => {
      expect(isMobile).toBeTrue();
    });
    window.dispatchEvent(new Event('resize'));
  });

  it('should detect desktop when window width is greater than or equal to the breakpoint', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1400);
    service.isMobile$.subscribe((isMobile) => {
      expect(isMobile).toBeFalse();
    });
    window.dispatchEvent(new Event('resize'));
  });

  it('should update isMobile$ when window is resized', () => {
    const spy = spyOn(service.isMobile$, 'next').and.callThrough();
    spyOnProperty(window, 'innerWidth').and.returnValue(1200);
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalledWith(true);

    spyOnProperty(window, 'innerWidth').and.returnValue(1400);
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalledWith(false);
  });
});
