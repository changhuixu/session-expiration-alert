import { InjectionToken } from '@angular/core';

export interface SessionExpirationConfig {
  totalMinutes: number;
}

export const ConfigToken = new InjectionToken<SessionExpirationConfig>(
  'config'
);
