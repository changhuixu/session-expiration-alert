import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionTimerService } from '../services/session-timer.service';

@Injectable()
export class SessionTimerHttpInterceptor implements HttpInterceptor {
  constructor(private readonly timerService: SessionTimerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.timerService.resetTimer();
    return next.handle(request);
  }
}
