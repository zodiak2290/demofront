import { TestBed } from '@angular/core/testing';

import { MobileDetectorService } from './mobile-detector.service';
import { first } from 'rxjs';

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
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(768);
    service.update();
    expect(service.isMobile).toBeTrue();
  });

  it('should detect non-mobile when window width is greater than 768', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(769);
    service.update();
    expect(service.isMobile).toBeFalse();
  });

  it('should emit isMobile$ observable when window is resized', (done) => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(768);

    const service = new MobileDetectorService();

    service.isMobile$.pipe(first()).subscribe((isMobile) => {
      expect(isMobile).toBeTrue();
      done();
    });

    window.dispatchEvent(new Event('resize'));
  });
});
