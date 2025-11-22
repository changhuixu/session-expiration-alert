import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionInterruptService } from '../services/session-interrupt.service';
import { SessionTimerService } from '../services/session-timer.service';

@Component({
  selector: 'session-expiration-alert',
  templateUrl: './session-expiration-alert.html',
  styleUrls: ['./session-expiration-alert.css', './btn.css'],
  imports: [AsyncPipe],
  providers: [SessionInterruptService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.tab)': 'handleTabKey($event)',
    '(document:keydown.shift.tab)': 'handleShiftTabKey($event)',
  },
})
export class SessionExpirationAlert implements OnInit, OnChanges, OnDestroy {
  /**
   * Should start the timer or not. Usually, you can set it to true if a user is authenticated.
   */
  @Input() startTimer? = true;

  /**
   * Count down seconds.
   */
  @Input() alertAt? = 60;

  showModal = false;
  expired = false;
  private sessionTimerSubscription!: Subscription;
  private el = inject(ElementRef);
  private sessionInterrupter = inject(SessionInterruptService);
  public sessionTimer = inject(SessionTimerService);

  ngOnInit() {
    if (!this.sessionTimerSubscription && this.startTimer) {
      this.trackSessionTime();
    }
    document.body.appendChild(this.el.nativeElement);
  }
  ngOnChanges(changes: SimpleChanges<{ startTimer: boolean }>): void {
    if (changes.startTimer) {
      this.cleanUp();
      if (changes.startTimer.currentValue) {
        this.trackSessionTime();
      }
    }
  }

  private trackSessionTime() {
    this.sessionTimer.startTimer();
    this.expired = false;
    this.sessionTimerSubscription = this.sessionTimer.remainSeconds$.subscribe(
      (t) => {
        if (t === this.alertAt) {
          this.open();
        }
        if (t === 0) {
          this.expired = true;
          this.cleanUp();
          this.sessionInterrupter.onExpire();
        }
      }
    );
  }
  continue() {
    this.sessionInterrupter.continueSession();
    this.sessionTimer.resetTimer();
    this.close();
  }
  logout() {
    this.sessionTimer.stopTimer();
    this.close();
    this.sessionInterrupter.stopSession();
  }

  open(): void {
    this.showModal = true;
    document.body.classList.add('sea-modal-open');
  }

  close(): void {
    this.showModal = false;
    document.body.classList.remove('sea-modal-open');
  }

  cleanUp() {
    this.sessionTimer.stopTimer();
    if (this.sessionTimerSubscription) {
      this.sessionTimerSubscription.unsubscribe();
    }
  }
  reload() {
    this.close();
    location.reload();
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
    this.cleanUp();
  }

  handleTabKey(event: Event) {
    const modal = document.querySelector('#session-expiration-alert');
    if (modal) {
      const btn1 = modal.querySelector<HTMLButtonElement>('button.btn-primary');
      const btn2 = modal.querySelector<HTMLButtonElement>(
        'button.btn-secondary'
      );
      if (document.activeElement === btn1) {
        btn2?.focus();
        event.preventDefault();
      }
    }
  }
  handleShiftTabKey(event: Event) {
    const modal = document.querySelector('#session-expiration-alert');
    if (modal) {
      const btn1 = modal.querySelector<HTMLButtonElement>('button.btn-primary');
      const btn2 = modal.querySelector<HTMLButtonElement>(
        'button.btn-secondary'
      );
      if (document.activeElement === btn2) {
        btn1?.focus();
        event.preventDefault();
      }
    }
  }
}
