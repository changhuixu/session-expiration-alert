import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SessionTimerService } from './services/session-timer.service';
import { SessionTimerHttpInterceptor } from './services/session-timer-http-interceptor';
import { SessionExpirationAlertComponent } from './components/session-expiration-alert/session-expiration-alert.component';
import { SessionInterruptService } from './services/session-interrupt.service';
import {
  SessionExpirationConfig,
  ConfigToken,
} from './models/session-expiration-config';

@NgModule({
  imports: [CommonModule],
  declarations: [SessionExpirationAlertComponent],
  providers: [
    SessionTimerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionTimerHttpInterceptor,
      multi: true,
    },
    SessionInterruptService,
  ],
  exports: [SessionExpirationAlertComponent],
})
export class SessionExpirationAlert {
  /**
   *
   * @param config  SessionExpirationConfig, default value: { totalMinutes: 20 }
   *
   */
  static forRoot(
    config: SessionExpirationConfig = {
      totalMinutes: 20,
    }
  ): ModuleWithProviders<SessionExpirationAlert> {
    return {
      ngModule: SessionExpirationAlert,
      providers: [
        {
          provide: ConfigToken,
          useValue: config,
        },
      ],
    };
  }
}
