import { Component } from '@angular/core';
import { SessionTimerService } from '../../projects/session-expiration-alert/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  alertAt = 15;
  startTimer = true;

  constructor(public sessionTimer: SessionTimerService) {}
  increase() {
    this.alertAt++;
  }
  toggleTimer() {
    this.startTimer = !this.startTimer;
  }
}
