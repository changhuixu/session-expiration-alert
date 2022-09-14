import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionInterruptService } from '../../services/session-interrupt.service';
import { SessionTimerService } from '../../services/session-timer.service';

@Component({
  selector: 'session-expiration-alert',
  templateUrl: './session-expiration-alert.component.html',
  styleUrls: ['./session-expiration-alert.component.css', './btn.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionExpirationAlertComponent
  implements OnInit, OnChanges, OnDestroy
{
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

  constructor(
    private el: ElementRef,
    private sessionInterrupter: SessionInterruptService,
    public sessionTimer: SessionTimerService
  ) {}

  ngOnInit() {
    if (!this.sessionTimerSubscription && this.startTimer) {
      this.trackSessionTime();
    }
    // move element to bottom of page (just before </body>)
    // so it can be displayed above everything else
    document.body.appendChild(this.el.nativeElement);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startTimer']) {
      this.cleanUp();
      if (changes['startTimer'].currentValue) {
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

  @HostListener('document:keydown.tab', ['$event'])
  handleTabKey(e: KeyboardEvent) {
    const modal = document.querySelector('#session-expiration-alert');
    if (modal) {
      const btn1 = modal.querySelector<HTMLButtonElement>('button.btn-primary');
      const btn2 = modal.querySelector<HTMLButtonElement>(
        'button.btn-secondary'
      );
      if (document.activeElement === btn1) {
        btn2?.focus();
        e.preventDefault();
      }
    }
  }
  @HostListener('document:keydown.shift.tab', ['$event'])
  handleShiftTabKey(e: KeyboardEvent) {
    const modal = document.querySelector('#session-expiration-alert');
    if (modal) {
      const btn1 = modal.querySelector<HTMLButtonElement>('button.btn-primary');
      const btn2 = modal.querySelector<HTMLButtonElement>(
        'button.btn-secondary'
      );
      if (document.activeElement === btn2) {
        btn1?.focus();
        e.preventDefault();
      }
    }
  }
}
