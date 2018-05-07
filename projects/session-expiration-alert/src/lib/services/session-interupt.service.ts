import { Injectable } from '@angular/core';

@Injectable()
export class SessionInteruptService {
  constructor() {}

  /**
   * Method to refresh session cookie. Normally, this method issue a quick API call to server.
   *
   * @memberof SessionInteruptService
   */
  continueSession() {
    console.log('You clicked continue session.');
  }

  /**
   * Method to remove session cookie. Normally, this method redirect to website log out end point.
   *
   * @memberof SessionInteruptService
   */
  stopSession() {
    console.log('You clicked stop session.');
  }
}
