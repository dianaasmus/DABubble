import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"dabubble-d80a3","appId":"1:102651520086:web:607b59ca16ab0a46b287f7","storageBucket":"dabubble-d80a3.appspot.com","apiKey":"AIzaSyCZZqQNNNGLm5U-SQbvC6UnKxMoBjGZU4M","authDomain":"dabubble-d80a3.firebaseapp.com","messagingSenderId":"102651520086"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
