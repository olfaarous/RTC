import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { hmr } from '@ngxs/hmr-plugin';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment.hmr';
if (environment.production) {
    enableProdMode();
}
const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
if (environment.hmr) {
    hmr(module, bootstrap).catch(err => console.error(err));
}
else {
    bootstrap().catch(err => console.log(err));
}
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
//# sourceMappingURL=main.js.map