import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { AuthService } from '../../core/services/session/auth.service';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { GestionarTransportesCircuitoComponent } from './gestionar-transportes-circuito.component';
import { GestionarTransportesCircuitoService } from './gestionar-transportes-circuito.service';

describe('GestionTransportesEnCircuitoComponent', () => {
  let component: GestionarTransportesCircuitoComponent;
  let fixture: ComponentFixture<GestionarTransportesCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarTransportesCircuitoComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        NgxPermissionsModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        GestionarTransportesCircuitoService,
        SearchFormActionsNotifierService,
        EstadoMovimientoService,
        ExcelService,
        NavigationService,
        MovimientoService,
        PageStateService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        FormBuilder,
        TipoDocumentoPorteService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarTransportesCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
