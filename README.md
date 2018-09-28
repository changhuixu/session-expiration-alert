# Session Expiration Alert

[![Build Status](https://img.shields.io/travis/changhuixu/session-expiration-alert/master.svg?label=Travis%20CI&style=flat-square)](https://travis-ci.org/changhuixu/session-expiration-alert)
[![npm](https://img.shields.io/npm/v/session-expiration-alert.svg?style=flat-square)](https://www.npmjs.com/package/session-expiration-alert)

[![npm License](https://img.shields.io/npm/l/session-expiration-alert.svg?style=flat-square)](https://github.com/changhuixu/session-expiration-alert/blob/master/LICENSE)

An Angular module to time session expiration. When user session idle time reaches a threshold, then pop up a modal dialog to let user choose to continue session or log out the system. When user session is expired, timer will stop and user will be logged out. A http interceptor is registered, so that session timer will restart at every http request.

Dependencies: Angular 6+, Bootstrap 4+ (css), NgBootstrap 3+.

## Demo

<https://stackblitz.com/github/changhuixu/session-expiration-alert>

## Usage

In `app.module.ts`

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SessionExpirationAlertModule.forRoot()
    // *** your other import modules
  ],
  providers: [
    {
      provide: SessionInteruptService,
      useClass: AppSessionInteruptService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

In `app.component.html`

```html
<session-expiration-alert></session-expiration-alert>
```

In `app-session-interupt.service.ts`

```typescript
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
```

Then the `SessionTimerService` will start to count down at each second.

* To provide actions in the alert modal dialog, you want to provide a `AppSessionInteruptService` class, which will be able to continue session via refreshing cookie, or stop session via logging out.

* To start/stop/reset timer, inject `SessionTimerService` into your component or service, then call `startTimer()`, `stopTimer()`, `resetTimer()` as needed.

* To get the remain time (in seconds), you can subscribe to `remainSeconds$` in `SessionTimerService`.

## Configuration

```typescript
 imports: [
   // ***
    SessionExpirationAlertModule.forRoot({totalMinutes: 0.5}),
   //***
  ],
```

The `SessionExpirationAlertModule` accepts a configuration with interface of `SessionExpirationConfig`, which is an optional input and has a default value of total minutes = 20 min.

```html
<session-expiration-alert [startTimer]="true" [alertAt]="2*60"></session-expiration-alert>
```

[optional] `startTimer` indicates if the app needs to work on session expiration check or not. Default: true.

[optional] `alertAt` indicates when the alert modal dialog should show up. The value means how many seconds left till session becomes expired. Default: 60 (seconds).
