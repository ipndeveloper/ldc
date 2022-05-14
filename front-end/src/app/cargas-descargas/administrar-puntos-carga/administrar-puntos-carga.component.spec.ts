import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarPuntosCargaComponent } from './administrar-puntos-carga.component';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { AuthService } from '../../core/services/session/auth.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { FormBuilder } from '@angular/forms';

describe('AdministrarPuntosCargaComponent', () => {
  let component: AdministrarPuntosCargaComponent;
  let fixture: ComponentFixture<AdministrarPuntosCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPuntosCargaComponent ],
      providers: [SearchFormActionsNotifierService,
                  ExcelService,
                  FormComponentService,
                  ApiService,
                  AuthService,
                  RestHandlerService,
                  RequestOptionsService,
                  FormBuilder],
      imports: [HttpClientTestingModule,
                PopupModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPuntosCargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
