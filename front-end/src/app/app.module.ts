import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from './core/components/modal/modal.module';
import { RouterModule } from '@angular/router';
import { HotkeyModule } from 'angular2-hotkeys';

import { CargasDescargasModule } from './cargas-descargas/cargas-descargas.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './home/toolbar/toolbar.component';
import { ToolbarService } from './home/toolbar/toolbar.service';
import { YardRoutes } from './shared/data-models/routes';
import { BaseComponentComponent } from './inheritance-sample/base-component/base-component.component';
import { DerivedComponentComponent } from './inheritance-sample/derived-component/derived-component.component';
import { PageSampleComponentComponent } from './inheritance-sample/page-sample-component/page-sample-component.component';
import { PopupModule } from './core/services/popupService/popup.module';
import { JasperoConfirmationsModule } from '@jaspero/ng-confirmations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PopupService } from './core/services/popupService/popup.service';
import { GestionAfipModule } from './gestion-afip/gestion-afip.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreSharedModule } from './core/core-shared.module';
import { SharedModule } from './shared/shared.module';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { TreeModule } from 'angular-tree-component';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    BaseComponentComponent,
    DerivedComponentComponent,
    PageSampleComponentComponent,
    LoginComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    ModalModule,
    CargasDescargasModule,
    GestionAfipModule,
    BrowserAnimationsModule,
    PopupModule,
    NgxDatatableModule,
    HotkeyModule.forRoot(),
    JasperoConfirmationsModule.forRoot(),
    NgbModule,
    RouterModule.forRoot(YardRoutes, {
      scrollPositionRestoration: 'top'
    }),
    ReactiveFormsModule,
    CoreSharedModule,
    SharedModule,
    NgxPermissionsModule.forRoot(),
    TreeModule.forRoot(),
    FontAwesomeModule,
    NgbTimepickerModule,
    NgProgressModule.withConfig({
      spinner: false,
      color: '#4d9d45'
    }),
    NgProgressRouterModule
  ],
  providers: [
    ToolbarService,
    PopupService,
    {
      provide: APP_INITIALIZER,
      useFactory: (ngxPermissionsService: NgxPermissionsService) => () => {
        const permisos = ngxPermissionsService.getPermissions();
        if (Object.keys(permisos).length === 0) {
          const jsonPermissions = localStorage.getItem(environment.permissionsKey);
          if (jsonPermissions) {
            const perms = JSON.parse(jsonPermissions);
            ngxPermissionsService.loadPermissions(perms);
          }
        }
        return Promise.resolve(true);
      },
      deps: [NgxPermissionsService],
      multi: true
    }
  ]
})
export class AppModule {
}
