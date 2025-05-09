import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideEnvironmentInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideEnvironmentInitializer(() => {
      initializeApp(environment.firebase);
      if (environment.useEmulator == true) {
        const db = getFirestore();
        connectFirestoreEmulator(db, '127.0.0.1', 8080);
      }
    }),
  ],
};
