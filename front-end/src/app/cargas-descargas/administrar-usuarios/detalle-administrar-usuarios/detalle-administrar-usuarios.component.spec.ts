import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { DetalleAdministrarUsuariosComponent } from './detalle-administrar-usuarios.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';
import { ApiService } from '../../../core/services/restClient/api.service';
import { of } from 'rxjs';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { RolTerminalDataView, ImpresoraUsuarioDataView } from '../../../shared/data-models/usuario-data-view';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

describe('DetalleAdministrarUsuariosComponent', () => {
  let component: DetalleAdministrarUsuariosComponent;
  let fixture: ComponentFixture<DetalleAdministrarUsuariosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdministrarUsuariosComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarUsuariosComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test refreshGrid', () => {

    it('Debe reasignar columnas y limpiar las seleccionadas', () => {

      // arrange
      const formArrayMock = new FormArray([new FormControl(), new FormControl()]);
      component.form = jasmine.createSpyObj('FormGroup', ['FormGroup']);
      component.form.controls = jasmine.createSpyObj('FormArray', ['rolesTerminal', 'impresoras']);

      spyOnProperty(component, 'rolesTerminal', 'get').and.returnValue(formArrayMock);
      spyOnProperty(component, 'impresoras', 'get').and.returnValue(formArrayMock);

      component.selectedRows = [1, 2, 3];
      component.selectedRowsImpresoras = [1, 2, 3];
      component.rows = [1, 2, 3];
      component.rowsImpresoras = [1, 2, 3];

      // act
      component.refreshGrid();

      // assert
      expect(component.selectedRows).toEqual([]);
      expect(component.selectedRowsImpresoras).toEqual([]);
      expect(component.rows).toEqual(formArrayMock.controls);
      expect(component.rowsImpresoras).toEqual(formArrayMock.controls);

    });
  });

  describe('Test metodo setGridColumns', () => {

    it('Setea colums e columsImpresoras', () => {
      // arrange
      const columns = [
        {
          prop: 'selected',
          name: '',
          sortable: false,
          canAutoResize: false,
          draggable: false,
          resizable: false,
          cellTemplate: component.selectRolesTerminalCellTemplate,
          width: 30,
        },
        {
          name: Resources.Labels.Terminal,
          prop: 'value.terminal.descripcion'
        },
        {
          name: Resources.Labels.Rol,
          prop: 'value.rol.descripcion'
        },
        {
          name: Resources.Labels.Habilitado,
          prop: 'value.estaHabilitado'
        }
      ];
      const columnsImpresoras = [
        {
          prop: 'selected',
          name: '',
          sortable: false,
          canAutoResize: false,
          draggable: false,
          resizable: false,
          cellTemplate: component.selectRolesTerminalCellTemplate,
          width: 30,
        },
        {
          name: Resources.Labels.Impresora,
          prop: 'value.impresora.descripcion'
        },
        {
          name: Resources.Labels.Habilitado,
          prop: 'value.estaHabilitado'
        }
      ];
      component.columns = [];
      component.columnsImpresoras = [];

      // act
      component.ngOnInit();

      // assert
      expect(component.columns).toEqual(columns);
      expect(component.columnsImpresoras).toEqual(columnsImpresoras);
    });
  });

  describe('Test del On select', () => {

    it('Debe asignar a selectedRows el valor suministrado ', () => {
      // arrange
      const rowsMock = { selected: [1, 2, 3] };
      component.selectedRows = [];

      // act
      component.onSelect(rowsMock);

      // assert
      expect(component.selectedRows).toEqual(rowsMock.selected);
    });

  });

  describe('Test del onSelectImpresora', () => {

    it('Debe asignar a selectedRows el valor suministrado ', () => {
      // arrange
      const rowsMock = { selected: [1, 2, 3] };
      component.selectedRowsImpresoras = [];

      // act
      component.onSelectImpresora(rowsMock);

      // assert
      expect(component.selectedRowsImpresoras).toEqual(rowsMock.selected);
    });

  });

  describe('Test del setRolesTerminal', () => {

    beforeEach(() => {

      const rolesTerminalMock = new FormArray([]);
      component.form = new FormGroup({ rolesTerminal: rolesTerminalMock });


    });

    it('Ejecuta refreshGrid', () => {
      // arrange
      const refreshGridMock = spyOn(component, 'refreshGrid');
      refreshGridMock.calls.reset();

      const rolTerminalDataViewmock = new RolTerminalDataView();
      rolTerminalDataViewmock.id = 1;
      rolTerminalDataViewmock.terminal = jasmine.createSpyObj('EntityWithDescription', ['']);
      rolTerminalDataViewmock.rol = jasmine.createSpyObj('EntityWithDescription', ['']);
      const arrayMock: RolTerminalDataView[] = [rolTerminalDataViewmock];

      // act
      component.setRolesTerminal(arrayMock);

      // assert
      expect(refreshGridMock).toHaveBeenCalledTimes(1);
    });

    it('Agrega un rol Terminal', () => {

      // arrange
      spyOn(component, 'refreshGrid');

      const rolTerminalDataViewmock = new RolTerminalDataView();
      rolTerminalDataViewmock.id = 1;
      rolTerminalDataViewmock.terminal = jasmine.createSpyObj('EntityWithDescription', ['']);
      rolTerminalDataViewmock.rol = jasmine.createSpyObj('EntityWithDescription', ['']);
      const arrayMock: RolTerminalDataView[] = [rolTerminalDataViewmock];

      // act
      component.setRolesTerminal(arrayMock);

      // assert
      expect(component.rolesTerminal.length).toBe(1);
    });

    it('Itera una vez en el for', () => {

      // arrange
      spyOn(component, 'refreshGrid');

      const rolTerminalDataViewmock = new RolTerminalDataView();
      const arrayMock: RolTerminalDataView[] = [rolTerminalDataViewmock];
      const createRolTerminalMock = spyOn<any>(component, 'createRolTerminal').and.returnValue(new FormGroup({}));

      createRolTerminalMock.calls.reset();
      // act
      component.setRolesTerminal(arrayMock);

      // assert
      expect(createRolTerminalMock).toHaveBeenCalledTimes(1);
    });

  });

  describe('Test del setImpresoras', () => {

    beforeEach(() => {

      const impresorasMock = new FormArray([]);
      component.form = new FormGroup({ impresoras: impresorasMock });


    });

    it('Ejecuta refreshGrid', () => {

      // arrange
      const refreshGridMock = spyOn(component, 'refreshGrid');
      refreshGridMock.calls.reset();

      const arrayMock: ImpresoraUsuarioDataView[] = [];

      // act
      component.setImpresoras(arrayMock);

      // assert
      expect(refreshGridMock).toHaveBeenCalledTimes(1);
    });

    it('Agrega un rol Terminal', () => {

      // arrange
      spyOn(component, 'refreshGrid');
      const impresoraDataViewmock = new ImpresoraUsuarioDataView();
      impresoraDataViewmock.id = 1;
      impresoraDataViewmock.impresora = jasmine.createSpyObj('EntityWithDescription', ['']);
      const arrayMock: ImpresoraUsuarioDataView[] = [impresoraDataViewmock];

      // act
      component.setImpresoras(arrayMock);

      // assert
      expect(component.impresoras.length).toBe(1);
    });

    it('Itera una vez en el for', () => {

      // arrange
      spyOn(component, 'refreshGrid');

      const impresorasDataViewmock = new ImpresoraUsuarioDataView();
      const arrayMock: ImpresoraUsuarioDataView[] = [impresorasDataViewmock];
      const createImpresoraMock = spyOn<any>(component, 'createImpresora').and.returnValue(new FormGroup({}));

      createImpresoraMock.calls.reset();
      // act
      component.setImpresoras(arrayMock);

      // assert
      expect(createImpresoraMock).toHaveBeenCalledTimes(1);
    });

  });

  describe('Test del metodo SetFocus', () => {

    it('Debe ejecutar setFocus sombre nombreAD', fakeAsync(() => {

      // arrange
      component.nombreAD = new TextoConEtiquetaComponent();
      const funcionSpy = spyOn<any>(component.nombreAD, 'setFocus');

      // act
      component.setFocus();
      tick(5);

      // assert
      expect(funcionSpy).toHaveBeenCalled();
      flush();
    }));

  });

  describe('Test del metodo OnAgregar', () => {

    it('Dene ejecutar el metodo open', () => {

      // arrange
      component.modalRolTerminal = jasmine.createSpyObj('ModalAgregarRolTerminalComponent', ['open']);

      // act
      component.onAgregar();

      // assert
      expect(component.modalRolTerminal.open).toHaveBeenCalledTimes(1);
    });

  });

  describe('Test del metodo onAgregarImpresora', () => {

    it('Dene ejecutar el metodo open', () => {

      // arrange
      component.modalImpresora = jasmine.createSpyObj('ModalAgregarImpresoraComponent', ['open']);

      // act
      component.onAgregarImpresora();

      // assert
      expect(component.modalImpresora.open).toHaveBeenCalledTimes(1);
    });

  });

  describe('Test del metodo onAcceptedRolTerminal', () => {

    beforeEach(() => {
      component.modalRolTerminal = jasmine.createSpyObj('ModalAgregarRolTerminalComponent', ['close']);
      component.form = new FormGroup({
        rolesTerminal: new FormArray([component['fb'].group({ habilitado: false, id: 1 })]),
        datosModalRolTerminal: component['fb'].group({ habilitado: true })
      });
    });


    it('llama almetodo refreshGrid', () => {

      // arrange
      const refreshGridMock = spyOn(component, 'refreshGrid');
      refreshGridMock.calls.reset();
      component.rolTerminalSiendoEditando = null;

      // act
      component.onAcceptedRolTerminal();

      // assert
      expect(refreshGridMock).toHaveBeenCalledTimes(1);

    });

    it('Llama la metodo close', () => {

      // arrange
      component.modalRolTerminal = jasmine.createSpyObj('ModalAgregarRolTerminalComponent', ['close']);
      spyOn(component, 'refreshGrid');
      component.rolTerminalSiendoEditando = null;

      // act
      component.onAcceptedRolTerminal();

      // assert
      expect(component.modalRolTerminal.close).toHaveBeenCalledTimes(1);

    });

    it('Llama la metodo createRolTerminal', () => {

      // arrange
      const metodoSpy = spyOn<any>(component, 'createRolTerminal').and.returnValue(new FormGroup({}));
      metodoSpy.calls.reset();
      spyOn(component, 'refreshGrid');
      component.rolTerminalSiendoEditando = null;

      // act
      component.onAcceptedRolTerminal();

      // assert
      expect(metodoSpy).toHaveBeenCalledTimes(1);

    });

    it('Llama la metodo patchValue', () => {

      // arrange
      spyOn<any>(component, 'createRolTerminal').and.returnValue(new FormGroup({}));
      spyOn(component, 'refreshGrid');
      component.rolTerminalSiendoEditando = new RolTerminalDataView();
      component.rolTerminalSiendoEditando.id = 1;

      // act
      const variableSpy = jasmine.createSpyObj('AbstractControl', ['patchValue']);
      spyOn<any>(component.rolesTerminal.controls, 'find').and.returnValue(variableSpy);
      component.onAcceptedRolTerminal();


      // assert
      expect(variableSpy.patchValue).toHaveBeenCalledTimes(1);

    });

    it('nullea rolTerminalSiendoEditando', () => {

      // arrange
      spyOn<any>(component, 'createRolTerminal').and.returnValue(new FormGroup({}));
      spyOn(component, 'refreshGrid');
      component.rolTerminalSiendoEditando = new RolTerminalDataView();
      component.rolTerminalSiendoEditando.id = 1;

      // act
      component.onAcceptedRolTerminal();


      // assert
      expect(component.rolTerminalSiendoEditando).toBeNull();

    });

  });


  describe('Test del metodo onAcceptedImpresora', () => {

    beforeEach(() => {
      component.modalImpresora = jasmine.createSpyObj('ModalAgregarImpresoraComponent', ['close']);
      component.form = new FormGroup({
        impresoras: new FormArray([component['fb'].group({ habilitado: false, id: 1 })]),
        datosModalImpresora: component['fb'].group({ habilitado: true })
      });
    });


    it('llama almetodo refreshGrid', () => {

      // arrange
      const refreshGridMock = spyOn(component, 'refreshGrid');
      refreshGridMock.calls.reset();
      component.impresoraSiendoEditando = null;

      // act
      component.onAcceptedImpresora();

      // assert
      expect(refreshGridMock).toHaveBeenCalledTimes(1);

    });

    it('Llama la metodo close', () => {

      // arrange
      component.modalImpresora = jasmine.createSpyObj('ModalAgregarImpresoraComponent', ['close']);
      spyOn(component, 'refreshGrid');
      component.impresoraSiendoEditando = null;

      // act
      component.onAcceptedImpresora();

      // assert
      expect(component.modalImpresora.close).toHaveBeenCalledTimes(1);

    });

    it('Llama la metodo createImpresora', () => {

      // arrange
      const metodoSpy = spyOn<any>(component, 'createImpresora').and.returnValue(new FormGroup({}));
      metodoSpy.calls.reset();
      spyOn(component, 'refreshGrid');
      component.impresoraSiendoEditando = null;

      // act
      component.onAcceptedImpresora();

      // assert
      expect(metodoSpy).toHaveBeenCalledTimes(1);

    });

    it('Llama la metodo patchValue', () => {

      // arrange
      spyOn<any>(component, 'createImpresora').and.returnValue(new FormGroup({}));
      spyOn(component, 'refreshGrid');
      component.impresoraSiendoEditando = new ImpresoraUsuarioDataView();
      component.impresoraSiendoEditando.id = 1;
      const variableSpy = jasmine.createSpyObj('AbstractControl', ['patchValue']);
      spyOn<any>(component.impresoras.controls, 'find').and.returnValue(variableSpy);

      // act
      component.onAcceptedImpresora();


      // assert
      expect(variableSpy.patchValue).toHaveBeenCalledTimes(1);

    });

    it('Nullea impresoraSiendoEditando', () => {

      // arrange
      spyOn<any>(component, 'createImpresora').and.returnValue(new FormGroup({}));
      spyOn(component, 'refreshGrid');
      component.impresoraSiendoEditando = new ImpresoraUsuarioDataView();
      component.impresoraSiendoEditando.id = 1;

      // act
      component.onAcceptedImpresora();


      // assert
      expect(component.impresoraSiendoEditando).toBeNull();

    });

  });

  describe('Test del metodo onmodificar', () => {

    it('Debe setear rolTerminalSiendoEditando ', () => {
      // arrange
      component.modalRolTerminal = jasmine.createSpyObj('ModalAgregarRolTerminalComponent', ['modificar']);
      component.rolTerminalSiendoEditando = null;

      const rolTerminalMock = new RolTerminalDataView();
      component.selectedRows = [{ value: rolTerminalMock }];

      // act
      component.onModificar();

      // assert
      expect(component.rolTerminalSiendoEditando === rolTerminalMock).toBeTruthy();

    });

    it('Ejecuta el metodo modificar ', () => {
      // arrange
      component.modalRolTerminal = jasmine.createSpyObj('ModalAgregarRolTerminalComponent', ['modificar']);
      const rolTerminalMock = new RolTerminalDataView();
      component.selectedRows = [{ value: rolTerminalMock }];
      // act
      component.onModificar();

      // assert
      expect(component.modalRolTerminal.modificar).toHaveBeenCalledTimes(1);
    });

  });

  describe('Test del metodo onModificarImpresora', () => {

    it('Debe setear rolTerminalSiendoEditando ', () => {
      // arrange
      component.modalImpresora = jasmine.createSpyObj('ModalAgregarImpresoraComponent', ['modificar']);
      component.impresoraSiendoEditando = null;
      const impresoraMock = new ImpresoraUsuarioDataView();
      component.selectedRowsImpresoras[0] = { value: impresoraMock };

      // act
      component.onModificarImpresora();

      // assert
      expect(component.impresoraSiendoEditando === impresoraMock).toBeTruthy();

    });

    it('Ejecuta el metodo modificar ', () => {
      // arrange
      component.modalImpresora = jasmine.createSpyObj('ModalAgregarImpresoraComponent', ['modificar']);
      const impresoraMock = new ImpresoraUsuarioDataView();
      component.selectedRowsImpresoras = [];
      component.selectedRowsImpresoras[0] = { value: impresoraMock };
      // act
      component.onModificarImpresora();

      // assert
      expect(component.modalImpresora.modificar).toHaveBeenCalledTimes(1);
    });

  });

  describe('Test metodo onClosingRolTerminal', () => {

    it('rolTerminalSiendoEditando debe ser null ', () => {
      // arrange
      component.rolTerminalSiendoEditando = new RolTerminalDataView();

      // act
      component.onClosingRolTerminal();

      // assert
      expect(component.rolTerminalSiendoEditando).toBeNull();

    });

  });

  describe('Test metodo onClosingImpresora', () => {

    it('impresoraSiendoEditando debe ser null ', () => {
      // arrange
      component.impresoraSiendoEditando = new ImpresoraUsuarioDataView();

      // act
      component.onClosingImpresora();

      // assert
      expect(component.impresoraSiendoEditando).toBeNull();

    });

  });

});
