import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionInterruptService } from '../../services/session-interrupt.service';
import { SessionTimerService } from '../../services/session-timer.service';

@Component({
  templateUrl: './session-expiration-alert-modal.component.html',
})
export class SessionExpirationAlertModalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private sessionInterrupter: SessionInterruptService,
    public sessionTimer: SessionTimerService
  ) {}

  ngOnInit() {}
  continue() {
    this.sessionInterrupter.continueSession();
    this.sessionTimer.resetTimer();
    this.activeModal.close();
  }
  logout() {
    this.sessionTimer.stopTimer();
    this.activeModal.close();
    this.sessionInterrupter.stopSession();
  }
}
