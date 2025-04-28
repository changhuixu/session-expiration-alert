import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionTimerService } from '../services/session-timer.service';

export function sessionTimerHttpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const timerService = inject(SessionTimerService);
  timerService.resetTimer();
  return next(req);
}
