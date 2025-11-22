import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, InjectionToken, Provider, Type } from '@angular/core';
import { SEA_INTERRUPT_SERVICE, SessionInterruptService } from './session-interrupt.service';
import { sessionTimerHttpInterceptor } from './session-timer-http-interceptor';

export interface SessionExpirationConfig {
  totalMinutes: number;
}

export const ConfigToken = new InjectionToken<SessionExpirationConfig>('config');

export function provideSessionExpirationServices(
  interrupter: Type<SessionInterruptService>,
  config?: SessionExpirationConfig
): (Provider | EnvironmentProviders)[] {
  return [
    {
      provide: ConfigToken,
      useValue: config || { totalMinutes: 20 },
    },
    { provide: SEA_INTERRUPT_SERVICE, useClass: interrupter },
    provideHttpClient(withInterceptors([sessionTimerHttpInterceptor])),
  ];
}
