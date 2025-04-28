import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  SessionExpirationAlert,
  SessionInterruptService,
  SessionTimerService,
} from '../../projects/session-expiration-alert/src/public-api';
import { AppSessionInterruptService } from './services/app-session-interrupt.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SessionExpirationAlert],
  providers: [
    {
      provide: SessionInterruptService,
      useClass: AppSessionInterruptService,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
