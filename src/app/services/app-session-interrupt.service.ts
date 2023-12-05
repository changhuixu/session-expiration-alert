import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionInterruptService } from '../../../projects/session-expiration-alert/src/public-api';

@Injectable()
export class AppSessionInterruptService extends SessionInterruptService {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }
  override continueSession() {
    console.log(`I issue an API request to server.`);
  }
  override stopSession() {
    console.log(`I logout.`);
  }
  override onExpire(): void {
    console.log(`Session expired`);
    console.log(`redirect to login page`);
  }
}
