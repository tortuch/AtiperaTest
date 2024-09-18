import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RxState } from '@rx-angular/state';
import { GLOBAL_RX_STATE, GlobalState } from './states';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    {
      provide: GLOBAL_RX_STATE,
      useFactory: () => new RxState<GlobalState>()
    }
  ]
};
