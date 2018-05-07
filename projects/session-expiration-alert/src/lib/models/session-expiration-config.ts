import { InjectionToken } from '@angular/core';

interface SessionExpirationConfig {
  totalMinutes: number;
}

const ConfigToken = new InjectionToken<SessionExpirationConfig>('config');

export { SessionExpirationConfig, ConfigToken };
