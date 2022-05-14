import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCaracteristicasComponent } from './administrar-caracteristicas.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FiltroAdministrarCaracteristicasComponent } from './filtro-administrar-caracteristicas/filtro-administrar-caracteristicas.component';
import { AdministrarCaracteristicasService } from './administrar-caracteristicas.service';
import { OpcionesSiNo } from '../../shared/enums/enums';
import { DetalleAdministrarCaracteristicasComponent } from './detalle-administrar-caracteristicas/detalle-administrar-caracteristicas.component';
import { configureTestSuite } from '../../core/mocks/testing';

describe('AdministrarCaracteristicasComponent', () => {
  let component: AdministrarCaracteristicasComponent;
  let fixture: ComponentFixture<AdministrarCaracteristicasComponent>;
  let fcService: FormComponentService;
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      declarations: [ AdministrarCaracteristicasComponent ],
      providers: [
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
        ExcelService,
        AdministrarCaracteristicasService,
        FiltroAdministrarCaracteristicasComponent,
        DetalleAdministrarCaracteristicasComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarCaracteristicasComponent);
    component = fixture.componentInstance;
    fcService = TestBed.get(FormComponentService);
    component.filtro = TestBed.get(FiltroAdministrarCaracteristicasComponent);
    component.detalle = TestBed.get(DetalleAdministrarCaracteristicasComponent);
    spyOn(component.filtro, 'setFocus').and.returnValue('');
    spyOn(component.detalle, 'setFocusCircuito').and.returnValue('');
    spyOn(component.detalle, 'setFocusHabilitado').and.returnValue('');
    spyOn(component.detalle, 'clearCaracteristicas').and.returnValue('');
    createForm();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function createForm() {
    const fb = new FormBuilder();
    component.form = fb.group({
      filtros: fb.group({
        circuito: { value: '' },
        actividad: { value: '' },
        caracteristica: { value: '' },
        estaHabilitado: [],
      }),
      detalle: fb.group({
        circuito: [''],
        actividadCircuito: [''],
        caracteristicaCircuito: [''],
        habilitado: [true]
      })
    });
  }


  describe('El metodo ngOnInit', () => {
    beforeEach(() => {
      spyOn<any>(component, 'subscribeToFiltersChanges');
      spyOn<any>(component, 'setDefaultValueCtrlHabilitado').and.returnValue('');
    });

    it('Crea el form', () => {
      // Arrange
      // Act
      component.ngOnInit();
      // Assert
      expect(component.form).toBeDefined();
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

    it('Setea el 0 al editId', () => {
      // Arrange
      // Act
      component.ngOnInit();
      // Assert
      expect(component.editId).toEqual(0);
    });

    it('Invoca al metodo setDefaultValueCtrlHabilitado', () => {
      // Arrange
      spyOn<any>(component, 'setFilters');
      // Act
      component.ngOnInit();
      // Assert
      expect(component['setDefaultValueCtrlHabilitado']).toHaveBeenCalledTimes(1);
    });

  });

  describe('El metodo ngAfterViewInit', () => {
    it('realiza foco sobre el control circuito', () => {
      // Arrange
      component.filtro = new FiltroAdministrarCaracteristicasComponent;
      spyOn(component.filtro, 'setFocus');
      // Act
      component.ngAfterViewInit();
      // Assert
      expect(component.filtro.setFocus).toHaveBeenCalled();
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

  describe('El metodo setGridColumns', () => {

    it('crea las columnas para la grilla ', () => {
      // Arrange

      // Act
      component['setGridColumns']();

      // Assert
      expect(component.columns).toBeDefined();
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

  describe('El metodo setDefaultValueCtrlHabilitado', () => {

    it('Setea como defecto la opcion Si al control estaHabilitado', () => {
      // Arrange
      const esperado = OpcionesSiNo.Si;
      // Act
      component['setDefaultValueCtrlHabilitado']();
      const resultado = component.form.get('filtros.estaHabilitado');
      // Assert
      if (resultado) {
        expect(resultado.value.id).toEqual(esperado);
      }
    });
  });

  describe('El metodo clickView', () => {

    it('setea a true a esConsulta', () => {
      // Arrange
      // Act
      component['clickView']('');
      // Assert
      expect(component.esConsulta).toBeTruthy();
    });

    it('setea a false a esModificacion', () => {
      // Arrange
      // Act
      component['clickView']('');
      // Assert
      expect(component.esModificacion).toBeFalsy();
    });

    it('Invoca al metodo prepareForm', () => {
      // Arrange
      spyOn<any>(component, 'prepareForm');
      // Act
      component['clickView']('');
      // Assert
      expect(component['prepareForm']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo clickAdd', () => {

    it('setea a false a disableButtons', () => {
      // Arrange
      // Act
      component['clickAdd']();
      // Assert
      expect(component.disableButtons).toBeFalsy();
    });

    it('setea a false a esConsulta', () => {
      // Arrange
      // Act
      component['clickAdd']();
      // Assert
      expect(component.esConsulta).toBeFalsy();
    });

    it('setea a false a esModificacion', () => {
      // Arrange
      // Act
      component['clickAdd']();
      // Assert
      expect(component.esModificacion).toBeFalsy();
    });

    it('Invoca al metodo deshabilitarControles', () => {
      // Arrange
      spyOn<any>(component, 'deshabilitarControles');
      // Act
      component['clickAdd']();
      // Assert
      expect(component['deshabilitarControles']).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo setFocusCircuito', () => {
      // Arrange
      // Act
      component['clickAdd']();
      // Assert
      expect(component.detalle.setFocusCircuito).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo clickEdit', () => {

    it('setea a false a esConsulta', () => {
      // Arrange
      // Act
      component['clickEdit']('');
      // Assert
      expect(component.esConsulta).toBeFalsy();
    });

    it('setea a true a esModificacion', () => {
      // Arrange
      // Act
      component['clickEdit']('');
      // Assert
      expect(component.esModificacion).toBeTruthy();
    });

    it('Invoca al metodo deshabilitarControles', () => {
      // Arrange
      spyOn<any>(component, 'deshabilitarControles');
      // Act
      component['clickEdit']('');
      // Assert
      expect(component['deshabilitarControles']).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo setfocusHabilitado', () => {
      // Arrange
      // Act
      component['clickEdit']('');
      // Assert
      expect(component.detalle.setFocusHabilitado).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo prepareForm', () => {

    it('setea a false a disableButtons', () => {
      // Arrange
      // Act
      component['prepareForm']('');
      // Assert
      expect(component.disableButtons).toBeFalsy();
    });

    it('Deshabilita los controles del filtro', () => {
      // Arrange
      // Act
      component['prepareForm']('');
      // Assert
      expect(component.form.controls.filtros.disable).toBeTruthy();
    });

    it('Deshabilita los controles del detalle cuando no es modificacion', () => {
      // Arrange
      component.esModificacion = false;
      // Act
      component['prepareForm']('');
      // Assert
      expect(component.form.controls.detalle.disable).toBeTruthy();
    });

    it('habilita los controles del detalle cuando es modificacion', () => {
      // Arrange
      component.esModificacion = true;
      // Act
      component['prepareForm']('');
      // Assert
      expect(component.form.controls.detalle.enable).toBeTruthy();
    });

    it('Invoca al metodo getCaracteristica', () => {
      // Arrange
      spyOn<any>(component, 'getCaracteristica');
      // Act
      component['prepareForm']('');
      // Assert
      expect(component['getCaracteristica']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo clickClear', () => {

    it('Invoca al metodo reset del control filtro', () => {
      // Arrange
      spyOn(component.form.controls.filtros, 'reset');
      // Act
      component['clickClear']();
      // Assert
      expect(component.form.controls.filtros.reset).toHaveBeenCalledTimes(1);
    });

    it('setea null a selectedRow', () => {
      // Arrange
      // Act
      component['clickClear']();
      // Assert
      expect(component.selectedRow).toBeNull();
    });

    it('habilita los controles del form', () => {
      // Arrange
      spyOn(component.form, 'enable');
      // Act
      component['clickClear']();
      // Assert
      expect(component.form.enable).toHaveBeenCalledTimes(1);
    });

    it('setea true a disableButtons', () => {
      // Arrange

      // Act
      component['clickClear']();
      // Assert
      expect(component.disableButtons).toBeTruthy();
    });

    it('Invoca al metodo reset del detalle', () => {
      // Arrange
      spyOn(component.form.controls.detalle, 'reset');
      // Act
      component['clickClear']();
      // Assert
      expect(component.form.controls.detalle.reset).toHaveBeenCalledTimes(1);
    });

    it('Setea el 0 al editId', () => {
      // Arrange
      // Act
      component['clickClear']();
      // Assert
      expect(component.editId).toEqual(0);
    });

    it('Invoca al metodo focus del filtro', () => {
      // Arrange

      // Act
      component['clickClear']();
      // Assert
      expect(component.filtro.setFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo onClickCancelar', () => {

    it('habilita los controles del form', () => {
      // Arrange
      spyOn(component.form, 'enable');
      // Act
      component['onClickCancelar']();
      // Assert
      expect(component.form.enable).toHaveBeenCalledTimes(1);
    });

    it('setea true a disableButtons', () => {
      // Arrange

      // Act
      component['onClickCancelar']();
      // Assert
      expect(component.disableButtons).toBeTruthy();
    });

    it('Invoca al metodo reset del detalle', () => {
      // Arrange
      spyOn(component.form.controls.detalle, 'reset');
      // Act
      component['onClickCancelar']();
      // Assert
      expect(component.form.controls.detalle.reset).toHaveBeenCalledTimes(1);
    });

    it('Setea el 0 al editId', () => {
      // Arrange
      // Act
      component['onClickCancelar']();
      // Assert
      expect(component.editId).toEqual(0);
    });

    it('Invoca al metodo focus del filtro', () => {
      // Arrange

      // Act
      component['onClickCancelar']();
      // Assert
      expect(component.filtro.setFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo mapControlsToCommand', () => {
    beforeEach(() => {
      spyOn(fcService, 'getValue').and.returnValue('0');
    });

    it('crea el command', () => {
      // Arrange

      // Act
      const command = component['mapControlsToCommand']();

      // Assert
      expect(command).toBeDefined();
    });

    it('crea el command con el idCircuito', () => {
      // Arrange

      // Act
      const command = component['mapControlsToCommand']();

      // Assert
      expect(command.IdCircuito).toBeDefined();
    });

    it('crea el command con el IdActividad', () => {
      // Arrange

      // Act
      const command = component['mapControlsToCommand']();

      // Assert
      expect(command.IdActividad).toBeDefined();
    });

    it('crea el command con el IdCaracteristica', () => {
      // Arrange

      // Act
      const command = component['mapControlsToCommand']();

      // Assert
      expect(command.IdCaracteristica).toBeDefined();
    });

    it('crea el command con habilitado', () => {
      // Arrange

      // Act
      const command = component['mapControlsToCommand']();

      // Assert
      expect(command.habilitado).toBeDefined();
    });
  });

});
