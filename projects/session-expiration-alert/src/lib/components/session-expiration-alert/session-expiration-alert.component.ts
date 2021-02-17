import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SessionTimerService } from '../../services/session-timer.service';
import { Subscription } from 'rxjs';
import { SessionExpirationAlertModalComponent } from '../session-expiration-alert-modal/session-expiration-alert-modal.component';
import { SessionInterruptService } from '../../services/session-interrupt.service';
import { SessionExpiredAlertModalComponent } from '../session-expired-alert-modal/session-expired-alert-modal.component';

@Component({
  selector: 'session-expiration-alert',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionExpirationAlertComponent
  implements OnInit, OnChanges, OnDestroy {
  /**
   * Should start the timer or not. Usually, you can set it to true if a user is authenticated.
   */
  @Input() startTimer? = true;

  /**
   * Count down seconds.
   */
  @Input() alertAt? = 60;
  private modalRef: NgbModalRef;
  private sessionTimerSubscription: Subscription;

  constructor(
    private sessionTimer: SessionTimerService,
    private modalService: NgbModal,
    private sessionInterrupter: SessionInterruptService
  ) {}

  ngOnInit() {
    if (!this.sessionTimerSubscription && this.startTimer) {
      this.trackSessionTime();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.startTimer) {
      this.cleanUp();
      if (changes.startTimer.currentValue) {
        this.trackSessionTime();
      }
    }
  }
  trackSessionTime() {
    this.sessionTimer.startTimer();
    this.sessionTimerSubscription = this.sessionTimer.remainSeconds$.subscribe(
      (t) => {
        if (t === this.alertAt) {
          this.modalRef = this.modalService.open(
            SessionExpirationAlertModalComponent,
            {
              backdrop: 'static',
              keyboard: false,
            }
          );
        }
        if (t === 0) {
          if (this.modalRef) {
            this.modalRef.close();
          }
          this.cleanUp();
          this.modalService.open(SessionExpiredAlertModalComponent, {
            backdrop: 'static',
            keyboard: false,
          });
        }
      }
    );
  }
  cleanUp() {
    this.sessionTimer.stopTimer();
    if (this.sessionTimerSubscription) {
      this.sessionTimerSubscription.unsubscribe();
    }
  }
  ngOnDestroy(): void {
    this.cleanUp();
  }
}
