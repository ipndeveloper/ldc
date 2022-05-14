import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarCupoComponent } from './validar-cupo.component';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { AuthService } from '../../core/services/session/auth.service';
import { CupoService } from '../shared/cupo/service/cupo.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { CupoComponent } from '../shared/cupo/cupo.component';
import { TipoProducto } from '../../shared/data-models/tipo-producto';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Cupo } from '../../shared/data-models/cupo';
import { ValidarCupoService } from './service/validar-cupo.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { EstadoCupo } from '../../shared/data-models/estado-cupo';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { EstadoVigenciaCupoDataView } from '../../shared/data-models/Estado-vigencia-cupo-data-view';
import { configureTestSuite } from '../../core/mocks/testing';
import { DocumentoPorteComponent } from '../shared/documento-porte/documento-porte.component';
import { CodigoCupo } from '../../shared/data-models/codigo-cupo';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { AnularCuposService } from '../gestionar-cupos/anular-cupos.service';
import { TurnoCircularService } from '../shared/services/turno-circular.service';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { ConsultarDatosAfipService } from '../../../app/gestion-afip/consultar-datos-afip/consultar-datos-afip-service';

describe('ValidarCupoComponent', () => {
  let component: ValidarCupoComponent;
  let fixture: ComponentFixture<ValidarCupoComponent>;
  let fcService: FormComponentService;
  let cupoService: CupoService;
  let tipoProducto: TipoProducto;
  let codigoCupo: CodigoCupo;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ValidarCupoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PopupModule
      ],
      providers: [
        ApiService,
        RequestOptionsService,
        FormComponentService,
        AuthService,
        ValidarCupoService,
        CircuitoService,
        CupoComponent,
        DocumentoPorteComponent,
        PopupService,
        RestHandlerService,
        NavigationService,
        EstadoMovimientoService,
        AnularCuposService,
        TurnoCircularService,
        DatePipe,
        FormBuilder,
        TipoDocumentoPorteService,
        ConsultarDatosAfipService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarCupoComponent);
    component = fixture.componentInstance;
    fcService = TestBed.get(FormComponentService);
    cupoService = TestBed.get(CupoService);
    component.cupoComponent = TestBed.get(CupoComponent);
    component.documentoPorte = TestBed.get(DocumentoPorteComponent);
    createForm();
    spyFunctions();
  });

  function spyFunctions() {
    spyOn(fcService, 'setValue');
    spyOn(fcService, 'enableControl');
    spyOn(fcService, 'disableControl');
    codigoCupo = new CodigoCupo();
    codigoCupo.codigoCupo = new Cupo(1, 'codigo');
    codigoCupo.estadoInicial = new EstadoCupo(1, 'estado');
    codigoCupo.estado = new EstadoCupo(1, 'estado');
    spyOn(cupoService, 'getCupoPorCodigo').and.returnValue(of(codigoCupo));
    spyOn(cupoService, 'getEstadoConCupo').and.returnValue(of(new EstadoVigenciaCupoDataView()));
    spyOn(cupoService, 'getEstadoSinCupo').and.returnValue(of(new EstadoVigenciaCupoDataView()));
    spyOn(component.documentoPorte, 'setFocus');
  }

  function createForm(): void {
    const fb = new FormBuilder();
    component.form = fb.group({
      circuito: fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        tipoTransporte: { value: '', disabled: true },
        tipoProducto: { value: '', disabled: false }
      }),
      documentoPorte: fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        numeroDocumentoPorte: { value: '', disabled: false }
      }),
      cupo: fb.group({
        conCupo: { value: '', disabled: false },
        codigoCupo: { value: '', disabled: true }
      }),
      datosDocumento: fb.group({
        producto: { value: undefined, disabled: true },
        vendedor: { value: '', disabled: true },
        corredorComprador: { value: '', disabled: true },
        destinatario: { value: '', disabled: true },
        sedeOrigen: { value: '', disabled: true },
        finalidad: { value: '', disabled: true },
        titularCartaPorte: { value: undefined, disabled: true },
        campoEpa: { value: undefined, disabled: true },
        cosecha: { value: undefined, disabled: true },
        procedencia: { value: undefined, disabled: true },
        tarjeta: { value: undefined, disabled: false },
        estadoCupo: fb.group({
          estadoCupoAnterior: fb.group({
            fechaCupo: { value: '', disabled: true },
            habilitado: { value: '', disabled: true },
            otorgados: { value: '', disabled: true },
            ingresados: { value: '', disabled: true },
            saldo: { value: '', disabled: true },
          }),
          estadoCupoVigente: fb.group({
            fechaCupo: { value: '', disabled: true },
            habilitado: { value: '', disabled: true },
            otorgados: { value: '', disabled: true },
            ingresados: { value: '', disabled: true },
            saldo: { value: '', disabled: true },
          }),
          estadoCupoSiguiente: fb.group({
            fechaCupo: { value: '', disabled: true },
            habilitado: { value: '', disabled: true },
            otorgados: { value: '', disabled: true },
            ingresados: { value: '', disabled: true },
            saldo: { value: '', disabled: true },
          }),
          sinCupo: fb.group({
            habilitado: { value: '', disabled: true },
            ingresados: { value: '', disabled: true },
          })
        }),
        confirmacionArriboCtg: fb.group({
          kilosNeto: { value: '', disabled: true },
          transportista: { value: undefined, disabled: true },
          chofer: { value: undefined, disabled: true },
          aceptarSinConfirmarCtg: { value: false, disabled: true },
          ctg: { value: '', disabled: true },
          codigoCancelacionCtg: { value: '', disabled: true }
        })
      }),
    });
    fcService.initialize(component.form);
  }

  function setValueControl(controlName: string, value: any) {
    const control = component.form.get(controlName);
    if (control) {
      control.setValue(value);
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo recuperar cupo', () => {
    beforeEach(() => {
      const codigoCupoCtrl = component.form.get('cupo.codigoCupo');
      if (codigoCupoCtrl) {
        spyOnProperty(codigoCupoCtrl, 'valid', 'get').and.returnValue(true);
      }
    });
    it('Invoca al getCupoPorCodigo del cupo service cuando el control es valido y tiene valor', () => {
      // Arrange
      setValueControl('cupo.codigoCupo', 'codigo');
      // Act
      component.recuperarCupo();
      // Assert
      expect(cupoService.getCupoPorCodigo).toHaveBeenCalledTimes(1);
    });

    it('No Invoca al getCupoPorCodigo del cupo service cuando el control no tiene valor', () => {
      // Arrange
      const codigoCupoCtrl = component.form.get('cupo.codigoCupo');
      if (codigoCupoCtrl) {
        jasmine.createSpy('codigoCupoCtrl').and.returnValue({});
      }
      // Act
      component.recuperarCupo();
      // Assert
      expect(cupoService.getCupoPorCodigo).toHaveBeenCalledTimes(0);
    });

    it('setea el dataview recuperado por el servicio', () => {
      // Arrange
      setValueControl('cupo.codigoCupo', 'codigo');
      // Act
      component.recuperarCupo();
      // Assert
      expect(component.cupo).toEqual(codigoCupo);
    });
  });

  describe('El metodo subscribeCambioConCupo', () => {

    beforeEach(() => {
      spyOn(component.cupoComponent, 'setFocus');
      component.cupo = codigoCupo;
    });

    it('Invoca al metodo enableControl del fcService para habilitar el campo codigoCupo cuado tiene cupo', () => {
      // Arrange

      // Act
      component['subscribeCambioConCupo']();
      setValueControl('cupo.conCupo', true);
      // Assert
      expect(fcService.enableControl).toHaveBeenCalledWith(`cupo.codigoCupo`);
    });

    it('Invoca al metodo Setfocus para realizar foco sobre el codigoCupo cuando tiene cupo', () => {
      // Arrange

      // Act
      component['subscribeCambioConCupo']();
      setValueControl('cupo.conCupo', true);
      // Assert
      expect(component.cupoComponent.setFocus).toHaveBeenCalledWith();
    });

    it('No invoca al metodo Setfocus para realizar foco sobre el codigoCupo cuando no tiene cupo', () => {
      // Arrange

      // Act
      component['subscribeCambioConCupo']();
      setValueControl('cupo.conCupo', false);
      // Assert
      expect(component.cupoComponent.setFocus).toHaveBeenCalledTimes(0);
    });
  });

  describe('El metodo subscribeCambioTipoProducto', () => {
    beforeEach(() => {
      tipoProducto = new TipoProducto(1, 'tipo producto');
      spyOn<any>(component, 'getCircuito');
    });

    it('Setea el tipo de producto', () => {
      // Arrange
      // Act
      component['subscribeCambioTipoProducto']();
      setValueControl('circuito.tipoProducto', tipoProducto);
      // Assert
      expect(component.tipoProducto).toEqual(tipoProducto);
    });

    it('Invoca al metodo getCircuito', () => {
      // Arrange

      // Act
      component['subscribeCambioTipoProducto']();
      setValueControl('circuito.tipoProducto', tipoProducto);
      // Assert
      expect(component['getCircuito']).toHaveBeenCalledTimes(1);
    });
  });
});
