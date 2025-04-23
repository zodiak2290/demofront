import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MobileDetectorService {
  private readonly mobileBreakpoint = 1300;
  isMobile$ = new BehaviorSubject<boolean>(window.innerWidth < this.mobileBreakpoint);

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize').subscribe(() => {
        const isMobile = window.innerWidth < this.mobileBreakpoint;
        this.ngZone.run(() => this.isMobile$.next(isMobile));
      });
    });
  }
}
