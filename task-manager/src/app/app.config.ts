import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';

import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const fs = getFirestore();
      if (!environment.production) {
        connectFirestoreEmulator(fs, 'localhost', 8080);
      }
      return fs;
    }),
  ],
};
