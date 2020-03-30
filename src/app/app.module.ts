import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  SessionExpirationAlert,
  SessionInteruptService
} from 'session-expiration-alert';

import { AppComponent } from './app.component';
import { AppSessionInteruptService } from './services/app-session-interupt.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SessionExpirationAlert.forRoot({ totalMinutes: 0.5 })
  ],
  providers: [
    {
      provide: SessionInteruptService,
      useClass: AppSessionInteruptService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
