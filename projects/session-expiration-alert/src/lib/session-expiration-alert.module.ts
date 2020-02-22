import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SessionTimerService } from './services/session-timer.service';
import { SessionTimerHttpInterceptor } from './services/session-timer-http-interceptor';
import { SessionExpirationAlertComponent } from './components/session-expiration-alert/session-expiration-alert.component';
import { SessionExpirationAlertModalComponent } from './components/session-expiration-alert-modal/session-expiration-alert-modal.component';
import { SessionInteruptService } from './services/session-interupt.service';
import {
  SessionExpirationConfig,
  ConfigToken
} from './models/session-expiration-config';

@NgModule({
  imports: [CommonModule, NgbModule],
  declarations: [
    SessionExpirationAlertComponent,
    SessionExpirationAlertModalComponent
  ],
  providers: [
    SessionTimerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionTimerHttpInterceptor,
      multi: true
    },
    SessionInteruptService
  ],
  exports: [SessionExpirationAlertComponent],
  entryComponents: [SessionExpirationAlertModalComponent]
})
export class SessionExpirationAlert {
  static forRoot(
    config: SessionExpirationConfig = {
      totalMinutes: 20
    }
  ): ModuleWithProviders<SessionExpirationAlert> {
    return {
      ngModule: SessionExpirationAlert,
      providers: [
        {
          provide: ConfigToken,
          useValue: config
        }
      ]
    };
  }
}
