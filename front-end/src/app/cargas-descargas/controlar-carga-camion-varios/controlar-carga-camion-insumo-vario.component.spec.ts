import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlarCargaCamionInsumoVarioComponent } from './controlar-carga-camion-insumo-vario.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { Routes } from '@angular/router';
import { CircuitoService } from '../shared/services/circuito.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { MovimientoCargaCamionInsumoVarioService } from './movimiento-carga-camion-insumo-vario.service';
import { AuthService } from '../../core/services/session/auth.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: ControlarCargaCamionInsumoVarioComponent,
      data: {
          title: 'ModificarProductoFueraCircuito'
      },
      pathMatch: 'full'
  }
];

describe('ControlarCargaCamionInsumoVarioComponent', () => {
  let component: ControlarCargaCamionInsumoVarioComponent;
  let fixture: ComponentFixture<ControlarCargaCamionInsumoVarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlarCargaCamionInsumoVarioComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        RouterTestingModule.withRoutes(MockRoutes)
      ],
      providers: [
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        MovimientoCargaCamionInsumoVarioService,
        NavigationService,
        FormComponentService,
        FormBuilder,
        AuthService,
        CircuitoService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlarCargaCamionInsumoVarioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
