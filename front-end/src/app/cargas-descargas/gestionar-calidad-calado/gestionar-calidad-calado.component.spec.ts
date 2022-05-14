import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionarCalidadCaladoComponent } from './gestionar-calidad-calado.component';
import { SearchCalidadCaladoService } from './services/search-calidad-calado/search-calidad-calado.service';
import { TestModule } from '../../core/mocks/test.module';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { GestionarCalidadCaladoService } from './services/gestionar-calidad-calado/gestionar-calidad-calado.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MovimientoService } from '../shared/services/movimiento.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { GestionarCalidadCaladoDataView } from '../../shared/data-models/gestionar-calidad-calado-data-view';
import { RouterTestingModule } from '@angular/router/testing';
import { SinRespuestaEntregadorCommand } from '../../shared/data-models/commands/cargas-descargas/sin-respuesta-entregador-command';
import { PopupService } from '../../core/services/popupService/popup.service';
import { of } from 'rxjs';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';

describe('GestionarCalidadCaladoComponent', () => {
  let component: GestionarCalidadCaladoComponent;
  let fixture: ComponentFixture<GestionarCalidadCaladoComponent>;
  let gestionarCalidadCaladoService: GestionarCalidadCaladoService;
  let pageStateService: PageStateService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarCalidadCaladoComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        SearchCalidadCaladoService,
        SearchFormActionsNotifierService,
        ExcelService,
        DropdownNotificationService,
        CircuitoService,
        GestionarCalidadCaladoService,
        MovimientoService,
        NavigationService,
        PageStateService,
        EstadoMovimientoService
      ],
      imports: [
        TestModule,
        RouterTestingModule
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCalidadCaladoComponent);
    component = fixture.componentInstance;
    gestionarCalidadCaladoService = TestBed.get(GestionarCalidadCaladoService);
    component.modalConfirmacionSinRespuestaEntregador.open = jasmine.createSpy('open');
    pageStateService = TestBed.get(PageStateService);
    spyOn(pageStateService, 'getState');
    spyOn(pageStateService, 'saveState');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método onClickSinRespEntregador', () => {
    it('Invoca al método modalConfirmacionSinRespuestaEntregador', () => {
      // Arrange
      component.selectedRows = [{ idEstado: 7 } as GestionarCalidadCaladoDataView ];
      spyOn(component, 'sinRespuestaEntregadorDeshabilitado').and.returnValue(false);

      // Act
      component.onClickSinRespEntregador();

      // Assert
      expect(component.modalConfirmacionSinRespuestaEntregador.open).toHaveBeenCalledTimes(1);
    });
  });

  describe('el método confirmacionSinRespuestaEntregador', () => {
    it('Invoca al método sinRespuestaEntregador del servicio gestionarCalidadCaladoService', () => {
      // Arrange
      const notificationActionsService = TestBed.get(SearchFormActionsNotifierService);
      const popupService = TestBed.get(PopupService);
      component.selectedRows = [
        { id: 1, idEstado: 7 } as GestionarCalidadCaladoDataView,
        { id: 2, idEstado: 7 } as GestionarCalidadCaladoDataView
      ];
      const idsMovimiento: number[] = [ component.selectedRows[0].id, component.selectedRows[1].id ];
      const command = new SinRespuestaEntregadorCommand(idsMovimiento, undefined);
      spyOn(gestionarCalidadCaladoService, 'sinRespuestaEntregador').and.returnValue(of({}));
      spyOn(popupService, 'success');
      spyOn(component, 'clear');
      spyOn(notificationActionsService, 'onRefreshGrid');

      // Act
      component.confirmacionSinRespuestaEntregador();

      // Assert
      expect(gestionarCalidadCaladoService.sinRespuestaEntregador).toHaveBeenCalledTimes(1);
      expect(gestionarCalidadCaladoService.sinRespuestaEntregador).toHaveBeenCalledWith(command);
    });
  });
});
