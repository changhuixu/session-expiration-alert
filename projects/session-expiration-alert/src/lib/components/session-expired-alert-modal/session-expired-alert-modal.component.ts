import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionInterruptService } from '../../services/session-interrupt.service';

@Component({
  templateUrl: './session-expired-alert-modal.component.html',
})
export class SessionExpiredAlertModalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private sessionInterrupter: SessionInterruptService
  ) {}

  ngOnInit() {}
  reload() {
    this.activeModal.close();
    location.reload();
  }
  logout() {
    this.activeModal.close();
    this.sessionInterrupter.stopSession();
  }
}
