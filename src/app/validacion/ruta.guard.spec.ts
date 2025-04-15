import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { RutaGuard } from './ruta.guard';
import { Router } from '@angular/router';

describe('RutaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutaGuard]
    });
  });

  it('should ...', inject([RutaGuard], (guard: RutaGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('RutaGuard', () => {
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(() => {
      mockRouter = jasmine.createSpyObj('Router', ['navigate']);
      TestBed.configureTestingModule({
        providers: [
          RutaGuard,
          { provide: Router, useValue: mockRouter }
        ]
      });
    });

    it('should be created', inject([RutaGuard], (guard: RutaGuard) => {
      expect(guard).toBeTruthy();
    }));

    it('should allow activation if token exists', inject([RutaGuard], (guard: RutaGuard) => {
      spyOn(localStorage, 'getItem').and.returnValue('mockToken');
      expect(guard.canActivate()).toBeTrue();
    }));

    it('should block activation and navigate to login if identity does not exist', inject([RutaGuard], (guard: RutaGuard) => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(guard.canActivate()).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
    }));
  });
});
