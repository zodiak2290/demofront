import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MobileDetectorService {
  private readonly mobileSubject = new BehaviorSubject<boolean>(this.checkIsMobile());
  public readonly isMobile$: Observable<boolean> = this.mobileSubject.asObservable();

  constructor() {
    window.addEventListener('resize', () => this.update());
  }

  private checkIsMobile(): boolean {
    return window.innerWidth <= 768;
  }

  public update(): void {
    this.mobileSubject.next(this.checkIsMobile());
  }

  public get isMobile(): boolean {
    return this.mobileSubject.value;
  }
}
