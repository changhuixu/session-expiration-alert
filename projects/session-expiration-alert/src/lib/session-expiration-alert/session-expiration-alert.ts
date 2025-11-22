import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SEA_INTERRUPT_SERVICE } from '../services/session-interrupt.service';
import { SessionTimerService } from '../services/session-timer.service';

@Component({
  selector: 'session-expiration-alert',
  templateUrl: './session-expiration-alert.html',
  styleUrls: ['./session-expiration-alert.css', './btn.css'],
  imports: [AsyncPipe],
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
  startTimer = input(true);

  /**
   * Count down seconds.
   */
  alertAt = input(60);

  showModal = signal(false);
  expired = signal(false);
  private sessionTimerSubscription?: Subscription;
  private el = inject(ElementRef);
  private sessionInterrupter = inject(SEA_INTERRUPT_SERVICE);
  public sessionTimer = inject(SessionTimerService);

  ngOnInit() {
    if (!this.sessionTimerSubscription && this.startTimer()) {
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
    this.expired.set(false);
    this.sessionTimerSubscription = this.sessionTimer.remainSeconds$.subscribe((t) => {
      if (t === this.alertAt()) {
        this.open();
      }
      if (t === 0) {
        this.expired.set(true);
        this.cleanUp();
        this.sessionInterrupter.onExpire();
      }
    });
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
    this.showModal.set(true);
    document.body.classList.add('sea-modal-open');
  }

  close(): void {
    this.showModal.set(false);
    document.body.classList.remove('sea-modal-open');
  }

  cleanUp() {
    this.sessionTimer.stopTimer();
    this.sessionTimerSubscription?.unsubscribe();
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
      const btn2 = modal.querySelector<HTMLButtonElement>('button.btn-secondary');
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
      const btn2 = modal.querySelector<HTMLButtonElement>('button.btn-secondary');
      if (document.activeElement === btn2) {
        btn1?.focus();
        event.preventDefault();
      }
    }
  }
}
