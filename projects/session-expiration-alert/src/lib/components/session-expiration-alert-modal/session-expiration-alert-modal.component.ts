import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionInteruptService } from '../../services/session-interupt.service';
import { SessionTimerService } from '../../services/session-timer.service';

@Component({
  templateUrl: './session-expiration-alert-modal.component.html',
  styleUrls: ['./session-expiration-alert-modal.component.css']
})
export class SessionExpirationAlertModalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private sessionInterupter: SessionInteruptService,
    public sessionTimer: SessionTimerService
  ) {}

  ngOnInit() {}
  continue() {
    this.sessionInterupter.continueSession();
    this.sessionTimer.resetTimer();
    this.activeModal.close();
  }
  logout() {
    this.sessionTimer.stopTimer();
    this.activeModal.close();
    this.sessionInterupter.stopSession();
  }
}
