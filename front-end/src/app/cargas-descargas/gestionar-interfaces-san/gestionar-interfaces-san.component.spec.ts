import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarInterfacesSanComponent } from './gestionar-interfaces-san.component';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InterfacesSanService } from './search-interfaces-san.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { of } from 'rxjs';
import { GestionarInterfacesSanDataView } from './gestionar-interfaces-san-data-view';
import { EstadosInterfazSan } from '../../shared/enums/enums';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { configureTestSuite } from '../../core/mocks/testing';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

describe('GestionarInterfacesSanComponent', () => {
  let component: GestionarInterfacesSanComponent;
  let fixture: ComponentFixture<GestionarInterfacesSanComponent>;
  let service: InterfacesSanService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [GestionarInterfacesSanComponent],
      providers: [
        FormBuilder,
        InterfacesSanService,
        SearchFormActionsNotifierService,
        DropdownNotificationService,
        TipoDocumentoPorteService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarInterfacesSanComponent);
    component = fixture.componentInstance;

    service = fixture.debugElement.injector.get(InterfacesSanService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngOnInit', () => {
    it('inicializa los filtros', () => {
      // Arrange

      // Act
      component.ngOnInit();

      // Assert
      expect(component.filters).not.toBeUndefined();
    });

    it('crea el form inicial', () => {
      // Arrange

      // Act
      component.ngOnInit();

      // Assert
      expect(component.form).not.toBeUndefined();
    });

    it('inicializa las columnas de la grilla', () => {
      // Arrange

      // Act
      component.ngOnInit();

      // Assert
      expect(component.columns).not.toBeUndefined();
    });

    it('invoca a subscribeToFilterControlChanges con filtros.servicioSan', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToFilterControlChanges');

      // Act
      component.ngOnInit();

      // Assert
      expect(component['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.servicioSan', 'servicioSan');
    });

    it('invoca a subscribeToFilterControlChanges con filtros.estado', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToFilterControlChanges');

      // Act
      component.ngOnInit();

      // Assert
      expect(component['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.estado', 'estado');
    });

    it('invoca a subscribeToFilterControlChanges con filtros.tipoMovimiento', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToFilterControlChanges');

      // Act
      component.ngOnInit();

      // Assert
      expect(component['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.tipoMovimiento', 'tipoMovimiento');
    });

    it('invoca a subscribeToFilterControlChanges con filtros.tipoTransporte', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToFilterControlChanges');

      // Act
      component.ngOnInit();

      // Assert
      expect(component['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.tipoTransporte', 'tipoTransporte');
    });

    it('invoca a subscribeToFilterControlChanges con filtros.nroDocPorte', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToFilterControlChanges');

      // Act
      component.ngOnInit();

      // Assert
      expect(component['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.nroDocPorte', 'nroDocPorte');
    });

    it('invoca a subscribeToFilterControlChanges con filtros.fechaIngresoDesde', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToFilterControlChanges');

      // Act
      component.ngOnInit();

      // Assert
      expect(component['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.fechaIngresoDesde', 'fechaIngresoDesde');
    });

    it('invoca a subscribeToFilterControlChanges con filtros.fechaIngresoHasta', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToFilterControlChanges');

      // Act
      component.ngOnInit();

      // Assert
      expect(component['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.fechaIngresoHasta', 'fechaIngresoHasta');
    });

    it('invoca a subscribeToActionEventsCustom', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToActionEventsCustom');

      // Act
      component.ngOnInit();

      // Assert
      expect(component['subscribeToActionEventsCustom']).toHaveBeenCalled();
    });

    it('invoca al metodo search', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToDropDownEvents').and.returnValue(of({}));
      spyOn<any>(component, 'search');

      // Act
      component.ngOnInit();

      // Assert
      expect(component['search']).toHaveBeenCalled();
    });
  });

  describe('El metodo clickSelectedRow', () => {
    it('setea el campo selectedRow cuando el row no es undefined', () => {
      // Arrange

      // Act
      component['clickSelectedRow']({});

      // Assert
      expect(component.selectedRow).toBeDefined();
    });

    it('limpia el campo selectedRow cuando el row es undefined', () => {
      // Arrange

      // Act
      component['clickSelectedRow']('undefined');

      // Assert
      expect(component.selectedRow).toBeNull();
    });
  });

  describe('El metodo clickClear', () => {
    it('invoca al metodo reset del form', () => {
      // Arrange
      spyOn(component.form, 'reset');
      spyOn<any>(component, 'init');

      // Act
      component['clickClear']();

      // Assert
      expect(component.form.reset).toHaveBeenCalledTimes(1);
    });

    it('limpia el selected row', () => {
      // Arrange

      // Act
      component['clickClear']();

      // Assert
      expect(component.selectedRow).toBeNull();
    });

    it('invoca al metodo init', () => {
      // Arrange
      spyOn<any>(component, 'init');

      // Act
      component['clickClear']();

      // Assert
      expect(component['init']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo onVerDetalle', () => {

    let selectedInterfaz;

    beforeEach(() => {
      selectedInterfaz = new GestionarInterfacesSanDataView();
      spyOnProperty(component, 'selectedInterfaz', 'get').and.returnValue(selectedInterfaz);

      component.modalDetalle.open = jasmine.createSpy('open');
    });

    it('invoca al metodo open del modalDetalle cuando se encuentra en estado movimiento rechazado', () => {
      // Arrange
      selectedInterfaz.idEstado = EstadosInterfazSan.MovimientoRechazado;

      // Act
      component.onVerDetalle();

      // Assert
      expect(component.modalDetalle.open).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo open del modalDetalle cuando se encuentra en estado error tecnico', () => {
      // Arrange
      selectedInterfaz.idEstado = EstadosInterfazSan.ErrorTecnico;

      // Act
      component.onVerDetalle();

      // Assert
      expect(component.modalDetalle.open).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo open del modalDetalle cuando se encuentra en estado finalizado', () => {
      // Arrange
      selectedInterfaz.idEstado = EstadosInterfazSan.Finalizado;

      // Act
      component.onVerDetalle();

      // Assert
      expect(component.modalDetalle.open).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo onReintentar', () => {

    let selectedInterfaz;
    let popupService;

    beforeEach(() => {
      selectedInterfaz = new GestionarInterfacesSanDataView();
      spyOnProperty(component, 'selectedInterfaz', 'get').and.returnValue(selectedInterfaz);

      component.modalDetalle.open = jasmine.createSpy('open');

      spyOn(service, 'reintentar').and.returnValue(of({}));

      popupService = fixture.debugElement.injector.get(PopupService);
    });

    it('invoca al reintentar del service cuando el selectedInterfaz esta con estado movimiento rechazado', () => {
      // Arrange
      selectedInterfaz.idEstado = EstadosInterfazSan.MovimientoRechazado;

      // Act
      component.onReintentar();

      // Assert
      expect(service.reintentar).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo success del popupService cuando el selectedInterfaz esta con estado movimiento rechazado', () => {
      // Arrange
      selectedInterfaz.idEstado = EstadosInterfazSan.MovimientoRechazado;
      spyOn(popupService, 'success');

      // Act
      component.onReintentar();

      // Assert
      expect(popupService.success).toHaveBeenCalledTimes(1);
    });

    it('invoca al reintentar del service cuando el selectedInterfaz esta con estado error tecnico', () => {
      // Arrange
      selectedInterfaz.idEstado = EstadosInterfazSan.ErrorTecnico;

      // Act
      component.onReintentar();

      // Assert
      expect(service.reintentar).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo success del popupService cuando el selectedInterfaz esta con estado error tecnico', () => {
      // Arrange
      selectedInterfaz.idEstado = EstadosInterfazSan.ErrorTecnico;
      spyOn(popupService, 'success');

      // Act
      component.onReintentar();

      // Assert
      expect(popupService.success).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo error del popupService cuando el selectedInterfaz esta con estado finalizado', () => {
      // Arrange
      selectedInterfaz.idEstado = EstadosInterfazSan.Finalizado;
      spyOn(popupService, 'error');

      // Act
      component.onReintentar();

      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo error del popupService cuando el selectedInterfaz esta con estado pendiente', () => {
      // Arrange
      selectedInterfaz.idEstado = EstadosInterfazSan.Pendiente;
      spyOn(popupService, 'error');

      // Act
      component.onReintentar();

      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo error del popupService cuando el selectedInterfaz esta con estado procesando', () => {
      // Arrange
      selectedInterfaz.idEstado = EstadosInterfazSan.Procesando;
      spyOn(popupService, 'error');

      // Act
      component.onReintentar();

      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo onReEjecutar', () => {

    let popupService;

    beforeEach(() => {
      spyOn(service, 'reEjecutar').and.returnValue(of({}));

      popupService = fixture.debugElement.injector.get(PopupService);
    });

    it('invoca al metodo info del popupService para informar que comienza la re ejecucion', () => {
      // Arrange
      spyOn(popupService, 'info');

      // Act
      component.onReEjecutar();

      // Assert
      expect(popupService.info).toHaveBeenCalledWith(Resources.Messages.ReEjecutandoInterfaces);
    });

    it('invoca al metodo reEjecutar del service', () => {
      // Arrange

      // Act
      component.onReEjecutar();

      // Assert
      expect(service.reEjecutar).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo success del popupService para informar que finalizo la re ejecucion', () => {
      // Arrange
      spyOn(popupService, 'success');

      // Act
      component.onReEjecutar();

      // Assert
      expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.InterfacesReEjecutadas);
    });

  });
});
