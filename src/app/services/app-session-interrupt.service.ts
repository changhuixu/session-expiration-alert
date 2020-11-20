import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionInterruptService } from 'projects/session-expiration-alert/src/public-api';

@Injectable()
export class AppSessionInterruptService extends SessionInterruptService {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }
  continueSession() {
    console.log(`I issue an API request to server.`);
  }
  stopSession() {
    console.log(`I logout.`);
  }
}
