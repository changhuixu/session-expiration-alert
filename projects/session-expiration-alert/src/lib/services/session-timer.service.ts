import { inject, Injectable } from '@angular/core';
import { interval, Observable, shareReplay, Subject, Subscription } from 'rxjs';
import { ConfigToken } from './session-expiration-config';

@Injectable({ providedIn: 'root' })
export class SessionTimerService {
  private readonly config = inject(ConfigToken);
  private readonly _timeoutSeconds = this.config.totalMinutes * 60;
  private timerSubscription?: Subscription;
  private timer: Observable<number> = interval(1000);
  private _remainSeconds = new Subject<number>();
  /**
   * Observable to get session remaining time (in seconds).
   *
   * Subscribers need to unsubscribe to it before hosting element is destroyed.
   *
   * @memberof SessionTimerService
   */
  remainSeconds$ = this._remainSeconds.asObservable().pipe(shareReplay(1));

  startTimer() {
    this.stopTimer();
    this.timerSubscription = this.timer.subscribe((n) => {
      if (n <= this._timeoutSeconds) {
        this._remainSeconds.next(this._timeoutSeconds - n);
      }
    });
  }

  stopTimer() {
    this.timerSubscription?.unsubscribe();
  }

  resetTimer() {
    this.startTimer();
  }
}
