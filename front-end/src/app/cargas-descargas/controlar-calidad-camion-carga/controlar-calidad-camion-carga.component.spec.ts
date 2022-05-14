import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlarCalidadCamionCargaComponent } from './controlar-calidad-camion-carga.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ControlarCalidadCamionCargaService } from './controlar-calidad-camion-carga.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommandService } from '../../shared/command-service/command.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { FormBuilder } from '@angular/forms';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';
import { ExcelService } from '../../core/services/excelService/excel.service';

describe('ControlarCalidadCamionCargaComponent', () => {
  let component: ControlarCalidadCamionCargaComponent;
  let fixture: ComponentFixture<ControlarCalidadCamionCargaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ControlarCalidadCamionCargaComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        FormBuilder,
        FormComponentService,
        ControlarCalidadCamionCargaService,
        SearchFormActionsNotifierService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        CommandService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlarCalidadCamionCargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
