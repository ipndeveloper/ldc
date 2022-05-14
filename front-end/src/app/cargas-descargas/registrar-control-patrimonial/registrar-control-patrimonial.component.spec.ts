import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegistrarControlPatrimonialComponent } from './registrar-control-patrimonial.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { CommandService } from '../../shared/command-service/command.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistrarControlPatrimonialService } from './registrar-control-patrimonial.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { BusquedaMovimientoPesajeService } from '../registrar-peso/busqueda-movimiento-pesaje/busqueda-movimiento-pesaje.service';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { of } from 'rxjs/internal/observable/of';
import { ControlarCalidadCargaDataView } from '../../shared/data-models/controlar-calidad-carga-data-view';
import { EntityWithCode } from '../../core/models/entity-with-code';
import { Resources } from '../../../locale/artifacts/resources';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Terminal } from '../../shared/data-models/terminal';
import { Sociedad } from '../../shared/data-models/sociedad';
import { Sede } from '../../shared/data-models/sede';
import { Puerto } from '../../shared/data-models/puerto';
import { Operaciones } from '../../shared/enums/enums';
import { NavigationExtras } from '@angular/router';
import { DecisionControlPatrimonialDataView } from '../../shared/data-models/decision-control-patrimonial-data-view';
import { ArchivoRegistrarControlPatrimonialCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-control-patrimonial-command';

describe('RegistrarControlPatrimonialComponent', () => {
  let component: RegistrarControlPatrimonialComponent;
  let fixture: ComponentFixture<RegistrarControlPatrimonialComponent>;
  let navigationService: any;
  let administrarRegistrarControlPatrimonialService: any;
  let fcService: any;
  let popupService: any;

  configureTestSuite(() => {
    navigationService = jasmine.createSpyObj('NavigationService', [
      'clearCache',
      'requestExtras',
      'clearPathCache',
      'navigateByMovement',
      'isFromGestionarTransporteCircuito',
      'navigateBackToSource'
    ]);

    administrarRegistrarControlPatrimonialService = jasmine.createSpyObj('RegistrarControlPatrimonialService', [
      'getByNavigtion'
    ]);

    fcService = jasmine.createSpyObj('FormComponentService', [
      'setValue',
      'disableControl',
      'initialize',
      'getValue'
    ]);

    popupService = jasmine.createSpyObj('PopupService', [
      'error',
      'blockUI',
      'unblockUI'
    ]);

    TestBed.configureTestingModule({
      declarations: [RegistrarControlPatrimonialComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        HotkeyModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        {provide: FormComponentService, useValue: fcService},
        {provide: RegistrarControlPatrimonialService, useValue: administrarRegistrarControlPatrimonialService},
        SearchFormActionsNotifierService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        CommandService,
        ExcelService,
        {provide: PopupService, useValue: popupService},
        {provide: NavigationService, useValue: navigationService},
        BusquedaMovimientoPesajeService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarControlPatrimonialComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    component.form.controls = jasmine.createSpyObj('AbstractControl', ['detalle']);
    component.filtro = jasmine.createSpyObj('FiltroRegistrarControlPatrimonialComponent', ['filtro']);
    component.detalle = jasmine.createSpyObj('ModalDecisionRegistrarControlPatrimonialComponent', ['detalle']);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngOnInit()', () => {
    it('invoca al metodo ngOnInit del padre y al metodo private subscribeNavigation()', () => {
      spyOn<any>(AdministrableFormComponent.prototype, 'ngOnInit');
      spyOn<any>(component, 'subscribeNavigation');

      component.ngOnInit();

      expect(AdministrableFormComponent.prototype['ngOnInit']).toHaveBeenCalled();
      expect(component['subscribeNavigation']).toHaveBeenCalled();
    });
  });

  describe('El metodo ngOnDestroy()', () => {
    it('invoca al metodo ngOnDestroy del padre y se ejecuta navigationService.clearCache', () => {
      spyOn<any>(AdministrableFormComponent.prototype, 'ngOnDestroy');
      component['destroyedByNavigation'] = false;

      component.ngOnDestroy();

      expect(AdministrableFormComponent.prototype.ngOnDestroy).toHaveBeenCalled();
      expect(navigationService.clearCache).toHaveBeenCalled();
    });
  });

  describe('El metodo privado subscribeNavigation()', () => {
    beforeEach(() => {
      navigationService.requestExtras.calls.reset();
    });

    it('invoca al metodo navigationService, y el administrarRegistrarControlPatrimonialService cuando el movimiento existe', () => {
      const params = {idMovimiento: 1};
      const movimiento: ControlarCalidadCargaDataView = {
        numeroDocumentoPorte: '000-12345678',
        patente: 'ABR 123',
        tarjeta: '123',
        producto: new EntityWithCode(1, '1', '1'),
        estado: '',
        ordenCarga: '',
        titularCP: '',
        vendedor: '',
        esCoeficienteVariable: true,
        fechaEntrada: '',
        tipoDocumentoPorte: '1',
        id: 1,
        nroViaje: '1'
      };
      navigationService.requestExtras.and.returnValue(of(params));
      administrarRegistrarControlPatrimonialService.getByNavigtion.and.returnValue(of(movimiento));
      spyOn<any>(component, 'completeDataBinding');

      component['subscribeNavigation']();

      expect(navigationService.requestExtras).toHaveBeenCalledTimes(1);
      expect(administrarRegistrarControlPatrimonialService.getByNavigtion).toHaveBeenCalledWith(+params.idMovimiento);
      expect(fcService.setValue).toHaveBeenCalledWith(`filtros.numeroDocumento`, movimiento.numeroDocumentoPorte);
      expect(fcService.setValue).toHaveBeenCalledWith(`filtros.patente`, movimiento.patente);
      expect(fcService.setValue).toHaveBeenCalledWith(`filtros.tarjeta`, movimiento.tarjeta);
      expect(fcService.setValue).toHaveBeenCalledWith(`filtros.producto`, movimiento.producto);
      expect(component['completeDataBinding']).toHaveBeenCalledWith([movimiento] as Array<ControlarCalidadCargaDataView>);
    });

    it('el idMovimeinto existe, el movimiento no existe y ejecuta el popupService', () => {
      const params = {idMovimiento: 1};
      navigationService.requestExtras.and.returnValue(of(params));
      administrarRegistrarControlPatrimonialService.getByNavigtion.and.returnValue(of(null));

      component['subscribeNavigation']();

      expect(navigationService.requestExtras).toHaveBeenCalledTimes(1);
      expect(administrarRegistrarControlPatrimonialService.getByNavigtion).toHaveBeenCalledWith(+params.idMovimiento);
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.NoSeEncontraronResultados);
    });

    it('el idMovimiento no existe y ejecuta el metodo protected search', () => {
      const params = {idMovimiento: null};
      navigationService.requestExtras.and.returnValue(of(params));
      spyOn<any>(component, 'search');

      component['subscribeNavigation']();

      expect(navigationService.requestExtras).toHaveBeenCalledTimes(1);
      expect(component['search']).toHaveBeenCalled();
    });
  });

  describe('El metodo private completeDataBinding', () => {
    it('sss', () => {
      const results: Array<ControlarCalidadCargaDataView> = [{
            id: 1,
            tipoDocumentoPorte: '',
            numeroDocumentoPorte: '',
            producto: new EntityWithCode(1, '', ''),
            estado: '',
            ordenCarga: '',
            nroViaje: '',
            titularCP: '',
            vendedor: '',
            patente: '',
            esCoeficienteVariable: true,
            fechaEntrada: '',
            tarjeta: ''
      }];

      component['completeDataBinding'](results);

      expect(navigationService.clearPathCache).toHaveBeenCalled();
      expect(component.rows).toEqual(results);
    });
  });

  describe('El metodo aceptar()', () => {
    beforeEach(() => {
      spyOn<any>(component, 'onClickAceptar');
    });

    it('invoca al metodo onClickAceptar() y setea aceptarContinuar con el valor correspondiente', () => {
      component.aceptar(true);

      expect(component.aceptarContinuar).toEqual(true);
      expect(component.onClickAceptar).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo onClickAceptar() y setea aceptarContinuar con el valor correspondiente', () => {
      component.aceptar(false);

      expect(component.aceptarContinuar).toEqual(false);
      expect(component.onClickAceptar).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo cancelarModal()', () => {
    it('invoca al metodo onClickCancelar() del componente y disableControl de fcService', () => {
      spyOn(component, 'onClickCancelar');
      component.terminal = new Terminal (1, '', false,
                                          new Sociedad(1, ''),
                                          new Sede(1, '', ''),
                                          new Puerto(1, '', true), '', true, true, true, true);

      component.cancelarModal();

      expect(component.onClickCancelar).toHaveBeenCalled();
      expect(fcService.disableControl).toHaveBeenCalledWith('filtros.tarjeta');
    });
  });

  describe('El metodo private continuar()', () => {
    it('invoca al service navigateByMovemente de navigationService', () => {
      component['continuar']();

      expect(navigationService.navigateByMovement).toHaveBeenCalled();
      expect(component['destroyedByNavigation']).toEqual(true);
    });
  });

  describe('El metodo privado setNavigationExtras()', () => {
   it('retorna queryParams', () => {
      const esperado: NavigationExtras = { queryParams: {'idMovimiento': component.idMovimiento,
                                                         'operacion': Operaciones.Alta }
                                         };
      spyOn<any>(component, 'setNavigationExtras').and.returnValue(esperado);

      const result = component['setNavigationExtras']();

      expect(result).toEqual(result);
   });
  });

  describe('El metodo fillControlsWithData()', () => {
    it('invoca 3 veces al fcService con sus respectivos parametros', () => {
      const parametros: DecisionControlPatrimonialDataView = {id: 1,
                                                             decision: '',
                                                             observaciones: '',
                                                             fechaHora: '',
                                                             usuario: '',
                                                             archivo: '' };
      component.fillControlsWithData(parametros, true);

      expect(fcService.setValue).toHaveBeenCalledWith('detalle.decision', parametros.decision, {onlySelf: true}, true);
      expect(fcService.setValue).toHaveBeenCalledWith('detalle.archivos', parametros.archivo, {onlySelf: true}, true);
      expect(fcService.setValue).toHaveBeenCalledWith('detalle.observacion', parametros.observaciones, {onlySelf: true}, true);
    });
  });

  describe('El metodo clearForm()', () => {
    it('invoca al metodo reset de form.controls.detalle', () => {
      component.form.controls.detalle.reset = jasmine.createSpy('reset');

      component.clearForm();

      expect(component.form.controls.detalle.reset).toHaveBeenCalled();
    });
  });

  describe('El metodo subscribeFilterChanges()', () => {
    it('invoca al metodo subscribeToFilterControlChanges() 4 veces con sus respectivos parametros ', () => {
      spyOn<any>(AdministrableFormComponent.prototype, 'subscribeToFilterControlChanges');

      component.subscribeFilterChanges();

      expect(AdministrableFormComponent.prototype['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.producto', 'producto');
      expect(AdministrableFormComponent.prototype['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.numeroDocumento', 'numeroDocumento');
      expect(AdministrableFormComponent.prototype['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.patente', 'patente');
      expect(AdministrableFormComponent.prototype['subscribeToFilterControlChanges']).toHaveBeenCalledWith('filtros.tarjeta', 'tarjeta');
    });
  });

  describe('El metodo getCreateSuccessMessage()', () => {
    it('retorna el string esperado', () => {
      const esperado = Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.ControlPatrimonial);

      const result = component.getCreateSuccessMessage();

      expect(result).toEqual(esperado);
    });
  });

  describe('El metodo getUpdateSuccessMessage()', () => {
    it('retorna el string esperado', () => {
      const esperado = Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.ControlPatrimonial);

      const result = component.getUpdateSuccessMessage();

      expect(result).toEqual(esperado);
    });
  });

  describe('El metodo setGridColums()', () => {
    it('setea las columnas correctamente', () => {
      const columns = [
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
          name: Resources.Labels.TipoDocumentoPorte,
          prop: 'tipoDocumentoPorte',
          width: 70
        },
        {
          name: Resources.Labels.NumeroDocumentoPorte,
          prop: 'numeroDocumentoPorte',
          width: 70
        },
        {
          name: Resources.Labels.Producto,
          prop: 'producto.descripcion',
          width: 200
        },
        {
          name: Resources.Labels.Estado,
          prop: 'estado',
          width: 70
        },
        {
          name: Resources.Labels.OrdenCarga,
          prop: 'ordenCarga',
          width: 70
        },
        {
          name: Resources.Labels.NroViaje,
          prop: 'nroViaje',
          width: 70
        },
        {
          name: Resources.Labels.TitularCP,
          prop: 'titularCP',
          width: 70
        },
        {
          name: Resources.Labels.Vendedor,
          prop: 'vendedor',
          width: 70
        },
        {
          name: Resources.Labels.PatenteCamion,
          prop: 'patente',
          width: 70
        }
      ];

      component.setGridColumns();

      expect(component.columns).toEqual(columns);
    });
  });

  describe('El metodo setFocusFiltro()', () => {
    it('invoca al metodo setFocus de filtro', fakeAsync (() => {
      component.filtro.setFocus = jasmine.createSpy('setFocus');

      component.setFocusFiltro();
      tick(1);

      expect(component.filtro.setFocus).toHaveBeenCalled();
    }));
  });

  describe('El metodo setFocusDetalle()', () => {
    it('invoca al metodo setFocus de detalle', fakeAsync (() => {
      component.detalle.setFocus = jasmine.createSpy('setFocus');

      component.setFocusDetalle();
      tick(1);

      expect(component.detalle.setFocus).toHaveBeenCalled();
    }));
  });

  describe('El metodo protected runAction()', () => {

    beforeEach(() => {
      spyOn<any>(AdministrableFormComponent.prototype, 'mostarMensaje');
    });

    it('invoca al metodo  blockUI y unblockUI de popupService, mostarMensaje y continuar si aceptarContinuar es true', () => {
      const action = of({} as any);
      spyOn<any>(component, 'continuar');
      component.aceptarContinuar = true;

      component['runAction'](action, '', '');

      expect(component.isLoading).toBeTruthy();
      expect(popupService.blockUI).toHaveBeenCalled();
      expect(AdministrableFormComponent.prototype['mostarMensaje']).toHaveBeenCalledWith({} as any, '', '');
      expect(popupService.unblockUI).toHaveBeenCalled();
      expect(component['continuar']).toHaveBeenCalled();
    });

    it('aceptarContinuar es false', () => {
      component.aceptarContinuar = false;
      component['esNavegacion'] = true;
      navigationService.isFromGestionarTransporteCircuito.and.returnValue(true);

      component['runAction'](of({} as any), '', '');

      expect(component['destroyedByNavigation']).toBeTruthy();
      expect(navigationService.navigateBackToSource).toHaveBeenCalled();
    });

    it('aceptarContinuar es false y esNavegacion tambien', () => {
      component.aceptarContinuar = false;
      component['esNavegacion'] = false;
      navigationService.isFromGestionarTransporteCircuito.and.returnValue(true);
      spyOn<any>(AdministrableFormComponent.prototype, 'cancelar');
      spyOn<any>(AdministrableFormComponent.prototype, 'setDisabledGroup');
      spyOn<any>(component, 'setFocusFiltro');
      spyOn<any>(component, 'search');
      component.detalle.close = jasmine.createSpy('close');

      component['runAction'](of({} as any), '', '');

      expect(component.isLoading).toBeFalsy();
      expect(component.detalle.close).toHaveBeenCalled();
      expect(AdministrableFormComponent.prototype['cancelar']).toHaveBeenCalled();
      expect(AdministrableFormComponent.prototype['setDisabledGroup']).toHaveBeenCalledWith(false, 'filtros');
      expect(component.setFocusFiltro).toHaveBeenCalled();
      expect(component['search']).toHaveBeenCalled();
    });
  });

  describe('El metodo clickEdit()', () => {

    beforeEach(() => {
      spyOn<any>(AdministrableFormComponent.prototype, 'setDisabledGroup');
      spyOn(component, 'fillControlsWithData');
      spyOn(component, 'setFocusDetalle');
      component.detalle.open = jasmine.createSpy('open');
    });

    it('ejecuta todos los metodos necesarios y setea las propiedades', () => {
      const row = {id: 1};
      component.esCopia = true;

      component.clickEdit(row);

      expect(component.disableButtons).toBeFalsy();
      expect(AdministrableFormComponent.prototype['setDisabledGroup']).toHaveBeenCalledWith(true, 'filtros');
      expect(AdministrableFormComponent.prototype['setDisabledGroup']).toHaveBeenCalledWith(false, 'detalle');
      expect(component.esConsulta).toBeFalsy();
      expect(component.editId).toBe(0);
      expect(component.idMovimiento).toBe(1);
      expect(component.setFocusDetalle).toHaveBeenCalled();
      expect(component.fillControlsWithData).toHaveBeenCalledWith(row, false);
      expect(component.detalle.open).toHaveBeenCalled();
    });

    it('esCopia es false y setea la propiedad editId correctamente', () => {
      const row = {id: 1};
      component.esCopia = false;

      component.clickEdit(row);

      expect(component.editId).toBe(1);
    });
  });

  describe('El metodo privado mapDecisionToCommand()', () => {
    it('retorna el valor correcto', () => {
      fcService.getValue.and.returnValue(1);

      const result = component['mapDecisionToCommand']();

      expect(result).toBeTruthy();
      expect(fcService.getValue).toHaveBeenCalledWith('detalle.decision');
    });

    it('retorna el valor correcto', () => {
      fcService.getValue.and.returnValue(2);

      const result = component['mapDecisionToCommand']();

      expect(result).toBeFalsy();
      expect(fcService.getValue).toHaveBeenCalledWith('detalle.decision');
    });
  });

  describe('El metodo privado mapArchivosToCommand()', () => {
    it('retorna el valor correcto', () => {
      const valorService: ArchivoRegistrarControlPatrimonialCommand[] = [{contenido: [1], nombre: '', extension: ''}];
      fcService.getValue.and.returnValue(valorService);

      const result = component['mapArchivosToCommand']();

      expect(result).toEqual(valorService);
    });
  });
});
