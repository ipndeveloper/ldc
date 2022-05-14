import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReembolsoTasaMunicipalComponent } from './reembolso-tasa-municipal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { ReembolsoTasaMunicipalService } from './reembolso-tasa-municipal.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HotkeyModule } from 'angular2-hotkeys';

describe('ReembolsoTasaMunicipalComponent', () => {
  let component: ReembolsoTasaMunicipalComponent;
  let fixture: ComponentFixture<ReembolsoTasaMunicipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReembolsoTasaMunicipalComponent ],
      imports: [HttpClientTestingModule,
                PopupModule,
                HotkeyModule.forRoot()],
      providers: [ReembolsoTasaMunicipalService,
                  FormBuilder,
                  FormComponentService,
                  ApiService,
                  RestHandlerService,
                  RequestOptionsService,
                  AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReembolsoTasaMunicipalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
