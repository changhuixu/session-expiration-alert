import { Component } from '@angular/core';
import { SessionTimerService } from 'session-expiration-alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alertAt = 15;
  startTimer = true;

  constructor(public sessionTimer: SessionTimerService) {}
  increase() {
    this.alertAt++;
  }
  toggletimer() {
    this.startTimer = !this.startTimer;
  }
}
