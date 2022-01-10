import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, interval, Subscription } from 'rxjs';
import {
  ConfigToken,
  SessionExpirationConfig
} from '../models/session-expiration-config';

@Injectable()
export class SessionTimerService {
  private readonly _timeoutSeconds: number;
  private _count: number = 0;
  private timerSubscription!: Subscription;
  private timer: Observable<number> = interval(1000);
  private _remainSeconds = new Subject<number>();
  /**
   * Observable to get session remaining time (in seconds).
   *
   * Subscribers need to unsubscribe to it before hosting element is destroyed.
   *
   * @memberof SessionTimerService
   */
  remainSeconds$ = this._remainSeconds.asObservable();

  constructor(@Inject(ConfigToken) readonly config: SessionExpirationConfig) {
    this._timeoutSeconds = config.totalMinutes * 60;
  }

  startTimer() {
    this.stopTimer();
    this._count = this._timeoutSeconds;
    this.timerSubscription = this.timer.subscribe(n => {
      if (this._count > 0) {
        this._count--;
        this._remainSeconds.next(this._count);
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.startTimer();
  }
}
