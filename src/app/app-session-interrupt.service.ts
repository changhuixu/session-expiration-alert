import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionInterruptService } from '../../projects/session-expiration-alert/src/public-api';

@Injectable()
export class AppSessionInterruptService implements SessionInterruptService {
  constructor(private readonly httpClient: HttpClient) {}
  continueSession() {
    console.log(`I issue an API request to server.`);
  }
  stopSession() {
    console.log(`I logout.`);
  }
  onExpire(): void {
    console.log(`Session expired`);
    console.log(`redirect to login page`);
  }
}
