import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../services/restClient/api.service';
import { LoginService } from '../services/session/login.service';
import { RestHandlerService } from '../services/restClient/restHandler.service';
import { AuthService } from '../services/session/auth.service';
import { RequestOptionsService } from '../services/restClient/requestOptions.service';
import { ToastrService } from 'ngx-toastr';
import { PopupModule } from '../services/popupService/popup.module';
import { PopupService } from '../services/popupService/popup.service';
import { JasperoConfirmationsModule } from '@jaspero/ng-confirmations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { SecurityService } from '../services/session/security.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder } from '@angular/forms';
import { UrlService } from '../services/restClient/url.service';

@NgModule({
    declarations: [

    ],
    exports: [
        TextMaskModule,
        NgbModule,
        NgxDatatableModule,
        NgxPermissionsModule,
        FontAwesomeModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [
        HttpClientTestingModule,
        PopupModule,
        NgxDatatableModule,
        NgxPermissionsModule.forRoot(),
        JasperoConfirmationsModule.forRoot(),
        NoopAnimationsModule,
        NgbModule,
        TextMaskModule,
        FontAwesomeModule
    ],
    providers: [
        ApiService,
        PopupService,
        LoginService,
        SecurityService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        ToastrService,
        NgxPermissionsService,
        FormBuilder,
        UrlService
    ]
})
export class TestModule {
    static forRoot() {
        PopupModule.forRoot();
    }
}
