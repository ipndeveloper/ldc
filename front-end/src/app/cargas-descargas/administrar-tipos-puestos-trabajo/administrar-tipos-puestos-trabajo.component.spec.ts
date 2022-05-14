import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarTiposPuestosTrabajoComponent } from './administrar-tipos-puestos-trabajo.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarTiposPuestosTrabajoService } from './administrar-tipos-puestos-trabajo.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TiposPuestosTrabajoDataView } from '../../shared/data-models/tipos-puestos-trabajo-data-view';
import { Resources } from '../../../locale/artifacts/resources';

describe('AdministrarTiposPuestoTrabajoComponent', () => {
  let component: AdministrarTiposPuestosTrabajoComponent;
  let fixture: ComponentFixture<AdministrarTiposPuestosTrabajoComponent>;
  let formComponentService: any;

  configureTestSuite(() => {
    formComponentService = jasmine.createSpyObj('FormComponentService', ['initialize', 'setValue', 'enableControl', 'validateForm', 'showValidationError', 'isValidForm', 'getValue']);
    TestBed.configureTestingModule({
      declarations: [AdministrarTiposPuestosTrabajoComponent],
      imports: [TestModule],
      providers: [
        { provide: FormComponentService, useValue: formComponentService },
        AdministrarTiposPuestosTrabajoService,
        SearchFormActionsNotifierService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarTiposPuestosTrabajoComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test SetFocusFiltro', () => {

    it('Debe ejecutos setFocus en filtro', () => {
      // arrange
      component.filtro = jasmine.createSpyObj('FiltroAdministrarTiposPuestosTrabajoComponent', ['setFocus']);

      // act
      component.setFocusFiltro();

      // assert
      expect(component.filtro.setFocus).toHaveBeenCalledTimes(1);
    });

  });

  describe('Test SetFocusDetalle', () => {

    it('Debe ejecutos setFocus en Detalle', () => {
      // arrange
      component.detalle = jasmine.createSpyObj('DetalleAdministrarTiposPuestosTrabajoComponent', ['setFocus']);

      // act
      component.setFocusDetalle();

      // assert
      expect(component.detalle.setFocus).toHaveBeenCalledTimes(1);
    });

  });

  describe('Test subscribeFilterChanges', () => {

    it('Debe ejecutar subscribeToFilterControlChanges', () => {

      // arrange
      const funcionSpy = spyOn<any>(component, 'subscribeFilterChanges');
      // act
      component.subscribeFilterChanges();

      // assert
      expect(funcionSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('Test subscribeFilterChanges', () => {

    it('Debedefinir formulario', () => {

      // arrange

      // act
      component.createForm();

      // assert
      expect(component.form.controls.filtros).toBeDefined();
      expect(component.form.controls.detalle).toBeDefined();
    });

  });

  describe('Test mapControlsToCommand', () => {

    it('Ejecuta dos veces un getvalue', () => {

      // arrange
      component.form = new FormGroup({});

      // act
      component.mapControlsToCommand();


      // assert
      expect(component['fcService'].getValue).toHaveBeenCalledTimes(2);
    });

  });

  describe('Test fillControlsWithData', () => {

    it('Debedefinir ejecuta setValue 2 veces', () => {

      // arrange
      component.form = new FormGroup({});

      // act
      component.fillControlsWithData(new TiposPuestosTrabajoDataView(5, 'test'), true);


      // assert
      expect(component['fcService'].setValue).toHaveBeenCalledTimes(2);
    });

  });


  describe('Test setGridColumns', () => {

    it('Debedefinir columns', () => {

      // arrange
      const columnsMock = [
        {
          prop: 'selected',
          name: '',
          sortable: false,
          canAutoResize: false,
          draggable: false,
          resizable: false,
          headerCheckboxable: false,
          checkboxable: true,
          width: 30
        },
        {
          name: Resources.Labels.Descripcion,
          prop: 'descripcion'
        }
      ];

      // act
      component.setGridColumns();


      // assert
      expect(component.columns).toEqual(columnsMock);
    });

  });

  describe('Test getUpdateSuccessMessage', () => {

    it('Debuelve string', () => {

      // arrange
      const stringExpect = 'La edición del Tipo Puesto fue guardada con éxito';

      // act
      const spy = component.getUpdateSuccessMessage();

      // assert
      expect(spy).toEqual(stringExpect);
    });

  });

  describe('Test getCreateSuccessMessage', () => {

    it('Debuelve string', () => {

      // arrange
      const stringExpect = 'El nuevo Tipo Puesto fue agregado con éxito';

      // act
      const spy = component.getCreateSuccessMessage();

      // assert
      expect(spy).toEqual(stringExpect);
    });

  });

});
