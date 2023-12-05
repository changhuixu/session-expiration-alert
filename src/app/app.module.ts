import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  SessionExpirationAlert,
  SessionInterruptService,
} from '../../projects/session-expiration-alert/src/public-api';

import { AppComponent } from './app.component';
import { AppSessionInterruptService } from './services/app-session-interrupt.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SessionExpirationAlert.forRoot({ totalMinutes: 0.5 }),
  ],
  providers: [
    {
      provide: SessionInterruptService,
      useClass: AppSessionInterruptService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
