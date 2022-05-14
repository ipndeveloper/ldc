import {  ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { GestionarDescargasPorEntregadorComponent } from './gestionar-descargas-por-entregador.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { TestModule } from '../../core/mocks/test.module';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchDescargasCamionesService } from './services/search-descargas-camiones.service';
import { TipoTransporteService } from '../../shared/desplegable-tipo-transporte/desplegable-tipo-transporte.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { PopupService } from '../../core/services/popupService/popup.service';
import { GestionarDescargasEntregadorDataView } from '../../shared/data-models/gestionar-desgargas-entregador-data-view';
import { RegistrarDecisionEntregadorCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-decision-entregador-command';
import { of } from 'rxjs';
import { RegistrarDecisionEntregadorService } from './registrar-decision-entregador.service';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: GestionarDescargasPorEntregadorComponent,
      data: {
          title: 'GestionarDescargasPorEntregador'
      },
      pathMatch: 'full'
  }
];

describe('GestionarDescargasPorEntregadorComponent', () => {
  let component: GestionarDescargasPorEntregadorComponent;
  let fixture: ComponentFixture<GestionarDescargasPorEntregadorComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionarDescargasPorEntregadorComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        SearchDescargasCamionesService,
        SearchFormActionsNotifierService,
        ExcelService,
        DropdownNotificationService,
        CircuitoService,
        NavigationService,
        TipoDocumentoPorteService,
        EstadoMovimientoService,
        TipoTransporteService,
        RegistrarDecisionEntregadorService,
        PageStateService
      ],
      imports: [
        TestModule,
        RouterTestingModule
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarDescargasPorEntregadorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('el método onClickAptoDescarga', () => {
    it('Invoca al método registrarDecisionEntregador del servicio registrarDecisionService', async(
      inject([PopupService, RegistrarDecisionEntregadorService],
        (popupService: PopupService, registrarDecisionService: RegistrarDecisionEntregadorService) => {

      // Arrange
      const notificationActionsService = TestBed.get(SearchFormActionsNotifierService);
      component.selectedRow = [
        { id: 1, idEstado: 7 } as GestionarDescargasEntregadorDataView,
        { id: 2, idEstado: 7 } as GestionarDescargasEntregadorDataView
      ];
      const idsMovimiento: number[] = [ component.selectedRow[0].id, component.selectedRow[1].id ];
      const command = new RegistrarDecisionEntregadorCommand();
      command.idsMovimiento = idsMovimiento;
      command.esAceptado = true;

      spyOn(registrarDecisionService, 'registrarDecisionEntregador').and.returnValue(of({}));
      spyOn(popupService, 'success');
      spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(true));

      spyOn(component, 'clear');
      spyOn(notificationActionsService, 'onRefreshGrid');

      // Act
      component.onClickAptoDescarga();

      // Assert
      popupService.confirm('').then(() => {
        expect(registrarDecisionService.registrarDecisionEntregador).toHaveBeenCalledTimes(1);
        expect(registrarDecisionService.registrarDecisionEntregador).toHaveBeenCalledWith(command);
      });
    })));
  });

  describe('el método onClickRechazar', () => {
    it('Invoca al método registrarDecisionEntregador del servicio registrarDecisionService', async(
      inject([PopupService, RegistrarDecisionEntregadorService],
        (popupService: PopupService, registrarDecisionService: RegistrarDecisionEntregadorService) => {

      // Arrange
      const notificationActionsService = TestBed.get(SearchFormActionsNotifierService);
      component.selectedRow = [
        { id: 1, idEstado: 7 } as GestionarDescargasEntregadorDataView,
        { id: 2, idEstado: 7 } as GestionarDescargasEntregadorDataView
      ];
      const idsMovimiento: number[] = [ component.selectedRow[0].id, component.selectedRow[1].id ];
      const command = new RegistrarDecisionEntregadorCommand();
      command.idsMovimiento = idsMovimiento;
      command.esAceptado = false;

      spyOn(registrarDecisionService, 'registrarDecisionEntregador').and.returnValue(of({}));
      spyOn(popupService, 'success');
      spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(true));

      spyOn(component, 'clear');
      spyOn(notificationActionsService, 'onRefreshGrid');

      // Act
      component.onClickRechazar();

      // Assert
      popupService.confirm('').then(() => {
        expect(registrarDecisionService.registrarDecisionEntregador).toHaveBeenCalledTimes(1);
        expect(registrarDecisionService.registrarDecisionEntregador).toHaveBeenCalledWith(command);
      });
    })));
  });
});


