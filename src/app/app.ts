import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  SessionExpirationAlert,
  SessionTimerService,
} from '../../projects/session-expiration-alert/src/public-api';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, SessionExpirationAlert],
  template: `
    <div style="margin: 1rem 0">
      <a href="https://github.com/changhuixu/session-expiration-alert">
        GitHub Repo
      </a>
    </div>

    <session-expiration-alert [alertAt]="alertAt" [startTimer]="startTimer" />

    <button (click)="increase()">change alert at</button> {{ alertAt }}
    <br /><br />
    <button (click)="toggleTimer()">toggle timer</button> {{ startTimer }}

    @if(sessionTimer.remainSeconds$ | async; as t){
    <h2>Session Remains {{ t }} seconds.</h2>
    }
  `,
  styles: ``,
})
export class App {
  alertAt = 15;
  startTimer = true;
  sessionTimer = inject(SessionTimerService); // only when you want to display the remaining time

  increase() {
    this.alertAt++;
  }
  toggleTimer() {
    this.startTimer = !this.startTimer;
  }
}
