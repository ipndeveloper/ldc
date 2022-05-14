import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { I18nProvider } from './app/core/providers/i18n-providers';

if (environment.production) {
  enableProdMode();
}

I18nProvider.initialize().then(i18n => {
  platformBrowserDynamic().bootstrapModule(AppModule, {
    preserveWhitespaces: true, // Esto ocasiona que no se minifique al máximo el bundle, pero preserva el layout
    providers: i18n
  })
  .catch(err => console.log(err));
});
