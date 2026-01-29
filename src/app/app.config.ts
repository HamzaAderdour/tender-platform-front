import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes'; // Assure-toi que ce fichier existe
import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // C'est ici qu'on active HttpClient avec notre intercepteur
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};