import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarNotificacionesComponent } from './gestionar-notificaciones.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { NotificacionesService } from './search-notificaciones.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreSharedModule } from '../../core/core-shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FiltroAdministrarNotificacionesComponent } from '../administrar-notificaciones/filtro-administrar-notificaciones/filtro-administrar-notificaciones.component';
import { of } from 'rxjs';
import { Resources } from '../../../locale/artifacts/resources';

describe('GestionarNotificacionesComponent', () => {
  let component: GestionarNotificacionesComponent;
  let fixture: ComponentFixture<GestionarNotificacionesComponent>;
  let searchNotificacionesService: NotificacionesService;
  let searchFormActionsNotifierService: SearchFormActionsNotifierService;
  let notificacionesService: NotificacionesService;
  let popupService: PopupService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarNotificacionesComponent ],
      imports: [
        CoreSharedModule,
        ReactiveFormsModule,
        TestModule,
        HttpClientModule
      ],
      providers: [
        SearchFormActionsNotifierService,
        DropdownNotificationService,
        NotificacionesService,
        PopupService,
        ApiService,
        FiltroAdministrarNotificacionesComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarNotificacionesComponent);
    component = fixture.componentInstance;
    mockServicios();
    component.selectedRow = [];
    spyOn(component.selectedRow, 'map').and.returnValue({});
  });

  function mockServicios() {
    component.filtroNotificaciones = TestBed.get(FiltroAdministrarNotificacionesComponent);
    searchNotificacionesService = TestBed.get(NotificacionesService);
    searchFormActionsNotifierService = TestBed.get(SearchFormActionsNotifierService);
    spyOn(searchNotificacionesService, 'getQuerystringParameter').and.returnValue('');
    spyOn<any>(searchNotificacionesService, 'getData').and.returnValue(of());
    notificacionesService = TestBed.get(NotificacionesService);
    popupService = TestBed.get(PopupService);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngOnInit', () => {
    beforeEach(() => {
      spyOn<any>(component, 'subscribeToFiltersChanges');
    });

    it('Invoca al metodo createForm', () => {
      // Arrange
      spyOn<any>(component, 'createForm');
      // Act
      component.ngOnInit();
      // Assert
      expect(component['createForm']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo setGridColumns', () => {
      // Arrange
      spyOn<any>(component, 'setGridColumns');
      // Act
      component.ngOnInit();
      // Assert
      expect(component['setGridColumns']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeToFiltersChanges', () => {
      // Arrange

      // Act
      component.ngOnInit();
      // Assert
      expect(component['subscribeToFiltersChanges']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo setFilters', () => {
      // Arrange
      spyOn<any>(component, 'setFilters');
      // Act
      component.ngOnInit();
      // Assert
      expect(component['setFilters']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeToActionEventsPrivate', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToActionEventsPrivate');
      // Act
      component.ngOnInit();
      // Assert
      expect(component['subscribeToActionEventsPrivate']).toHaveBeenCalledTimes(1);
    });

  });

  describe('El metodo createForm', () => {

    it('crea el form', () => {
      // Arrange

      // Act
      component['createForm']();

      // Assert
      expect(component.form).toBeDefined();
    });
  });

  describe('El metodo setGridColumns', () => {

    it('crea las columnas para la grilla ', () => {
      // Arrange

      // Act
      component['setGridColumns']();

      // Assert
      expect(component.columns).toBeDefined();
    });
  });

  describe('El metodo setFilters', () => {

    it('Crea los filtros', () => {
      // Arrange

      // Act
      component['setFilters']();

      // Assert
      expect(component.filters).toBeDefined();
    });

  });

  describe('El metodo subscribeToActionEventsPrivate', () => {

    it('Invoca al metodo clickSelectedRow cuando se selecciona una fila', () => {
      // Arrange
      spyOn<any>(component, 'clickSelectedRow');
      component.selectedRow = [];
      // Act
      component['subscribeToActionEventsPrivate']();
      searchFormActionsNotifierService.onSelectedRows([]);
      // Assert
      expect(component['clickSelectedRow']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo clickSelectedRow', () => {

    it('Setea null a selectedRow cuando la row seleccionada es null', () => {
      // Arrange
      component.selectedRow = [];
      const row = undefined;
      // Act
      component['clickSelectedRow'](row);
      // Assert
      expect(component.selectedRow).toBe(null);
    });

    it('Setea el valor de la row a selectedRow cuando row no es null', () => {
      // Arrange
      component.selectedRow = [];
      const row = [];
      // Act
      component['clickSelectedRow'](row);
      // Assert
      expect(component.selectedRow).toEqual(row);
    });

  });

  describe('El metodo onReintentar', () => {
    beforeEach(() => {
      spyOn(notificacionesService, 'reintentar').and.returnValue(of({id: 1}));
    });

    it('Invoca al metodo reintentar de NotificacionesService', () => {
      // Arrange

      // Act
      component.onReintentar();
      // Assert
      expect(notificacionesService.reintentar).toHaveBeenCalledTimes(1);
    });

    it('Invoca al popupService.success', () => {
      // Arrange
      spyOn(popupService, 'success').and.returnValue(of());
      // Act
      component.onReintentar();
      // Assert
      expect(popupService.success).toHaveBeenCalledTimes(1);
    });

    it('Invoca al popupService.success con el mensaje ReintentoNotificacionExitoso', () => {
      // Arrange
      spyOn(popupService, 'success').and.returnValue(of());
      // Act
      component.onReintentar();
      // Assert
      expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.ReintentoNotificacionExitoso);
    });

    it('Invoca al metodo search', () => {
      // Arrange
      spyOn<any>(component, 'search').and.returnValue(of());
      // Act
      component.onReintentar();
      // Assert
      expect(component['search']).toHaveBeenCalledTimes(1);
    });

  });

  describe('El metodo onCacelar', () => {
    beforeEach(() => {
      spyOn(notificacionesService, 'cancelar').and.returnValue(of({id: 1}));
    });

    it('Invoca al metodo reintentar de NotificacionesService', () => {
      // Arrange

      // Act
      component.onCancelar();
      // Assert
      expect(notificacionesService.cancelar).toHaveBeenCalledTimes(1);
    });

    it('Invoca al popupService.success', () => {
      // Arrange
      spyOn(popupService, 'success').and.returnValue(of());
      // Act
      component.onCancelar();
      // Assert
      expect(popupService.success).toHaveBeenCalledTimes(1);
    });

    it('Invoca al popupService.success con el mensaje SeCanceloLaNotificacion', () => {
      // Arrange
      spyOn(popupService, 'success').and.returnValue(of());
      // Act
      component.onCancelar();
      // Assert
      expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.SeCanceloLaNotificacion);
    });

    it('Invoca al metodo search', () => {
      // Arrange
      spyOn<any>(component, 'search').and.returnValue(of());
      // Act
      component.onCancelar();
      // Assert
      expect(component['search']).toHaveBeenCalledTimes(1);
    });

  });

  describe('El metodo ngOnDestroy', () => {

    it('Invoca al metodo onDestroy.next ', () => {
      // Arrange
      spyOn<any>(component.onDestroy, 'next');
      // Act
      component.ngOnDestroy();
      // Assert
      expect(component.onDestroy.next).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo clearSubscriptions', () => {
      // Arrange
      spyOn<any>(component, 'clearSubscriptions');
      // Act
      component.ngOnDestroy();
      // Assert
      expect(component['clearSubscriptions']).toHaveBeenCalledTimes(1);
    });
  });

});
