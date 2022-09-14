import { Injectable } from '@angular/core';

@Injectable()
export class SessionInterruptService {
  constructor() {}

  /**
   * Method to refresh session cookie. Normally, this method issue a quick API call to server.
   *
   * @memberof SessionInterruptService
   */
  continueSession() {
    console.log('You clicked continue session.');
  }

  /**
   * Method to remove session cookie. Normally, this method redirect to website logout endpoint.
   *
   * @memberof SessionInterruptService
   */
  stopSession() {
    console.log('You clicked logout.');
  }

  /**
   * Method to handle expiration event. Can be empty.
   */
  onExpire() {
    console.log('Session expired.');
  }
}
