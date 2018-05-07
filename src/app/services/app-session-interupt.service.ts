import { Injectable } from '@angular/core';
import { SessionInteruptService } from 'session-expiration-alert';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppSessionInteruptService extends SessionInteruptService {
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
