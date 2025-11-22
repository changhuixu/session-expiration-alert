import { ApplicationConfig } from '@angular/core';
import { provideSessionExpirationServices } from '../../projects/session-expiration-alert/src/public-api';
import { AppSessionInterruptService } from './app-session-interrupt.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSessionExpirationServices(AppSessionInterruptService, {
      totalMinutes: 0.5,
    }),
  ],
};
