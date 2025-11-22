import { InjectionToken } from '@angular/core';

export const SEA_INTERRUPT_SERVICE = new InjectionToken<SessionInterruptService>(
  'SessionInterruptService'
);

export interface SessionInterruptService {
  /**
   * Method to refresh session cookie. Normally, this method issue a quick API call to server.
   *
   * @memberof SessionInterruptService
   */
  continueSession(): void;

  /**
   * Method to remove session cookie. Normally, this method redirect to website logout endpoint.
   *
   * @memberof SessionInterruptService
   */
  stopSession(): void;

  /**
   * Method to handle expiration event. Can be empty.
   */
  onExpire(): void;
}
