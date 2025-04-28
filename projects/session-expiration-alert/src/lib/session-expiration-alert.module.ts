import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SessionExpirationAlertComponent } from './components/session-expiration-alert/session-expiration-alert.component';
import {
  ConfigToken,
  SessionExpirationConfig,
} from './models/session-expiration-config';
import { SessionInterruptService } from './services/session-interrupt.service';
import { sessionTimerHttpInterceptor } from './services/session-timer-http-interceptor';
import { SessionTimerService } from './services/session-timer.service';

@NgModule({
  imports: [CommonModule],
  declarations: [SessionExpirationAlertComponent],
  providers: [
    SessionTimerService,
    provideHttpClient(withInterceptors([sessionTimerHttpInterceptor])),
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
