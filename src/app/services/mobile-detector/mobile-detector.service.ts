import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MobileDetectorService {
  private readonly mobileSubject = new BehaviorSubject<boolean>(this.checkIsMobile());
  public readonly isMobile$ = this.mobileSubject.asObservable();

  constructor() {
    window.addEventListener('resize', () => {
      this.mobileSubject.next(this.checkIsMobile());
    });
  }

  private checkIsMobile(): boolean {
    return window.innerWidth <= 768;
  }

  public get isMobile(): boolean {
    return this.mobileSubject.value;
  }
}
