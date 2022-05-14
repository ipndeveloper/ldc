import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlarCargaCamionComponent } from './controlar-carga-camion.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { Routes } from '@angular/router';
import { CircuitoService } from '../shared/services/circuito.service';
import { of } from 'rxjs';
import { Resources } from '../../../locale/artifacts/resources';
import { Producto } from '../../shared/data-models/producto';
import { Terminal } from '../../shared/data-models/terminal';
import { Sociedad } from '../../shared/data-models/sociedad';
import { Sede } from '../../shared/data-models/sede';
import { DocumentoPorteComponent } from '../shared/documento-porte/documento-porte.component';
import { ModalAsignarTarjetaComponent } from '../shared/modals/modal-asignar-tarjeta/modal-asignar-tarjeta.component';
import { MovimientoCargaCamion } from '../../shared/data-models/movimiento-carga';
import { TiposCartaPorte, TiposDocumentoPorte } from '../../shared/enums/enums';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { MovimientoCargaCamionService } from './movimiento-carga-camion.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { AuthService } from '../../core/services/session/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AsignarTarjetaService } from '../shared/modals/modal-asignar-tarjeta/asignar-tarjeta.service';
import { Puerto } from '../../shared/data-models/puerto';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

export const MockRoutes: Routes = [
  {
    path: '',
    component: ControlarCargaCamionComponent,
    data: {
        title: 'ModificarProductoFueraCircuito'
    },
    pathMatch: 'full'
  }
];

describe('ControlarCargaCamionComponent', () => {
  let component: ControlarCargaCamionComponent;
  let fixture: ComponentFixture<ControlarCargaCamionComponent>;
  let fcService: FormComponentService;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlarCargaCamionComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        RouterTestingModule.withRoutes(MockRoutes)
      ],
      providers: [
        ApiService,
        RequestOptionsService,
        RestHandlerService,
        MovimientoCargaCamionService,
        CircuitoService,
        NavigationService,
        FormComponentService,
        FormBuilder,
        AuthService,
        DocumentoPorteComponent,
        ModalAsignarTarjetaComponent,
        AsignarTarjetaService,
        TipoDocumentoPorteService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  function createForm() {
    component.form = fb.group({
      circuito: fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: Resources.Labels.Carga, disabled: true },
        tipoTransporte: { value: Resources.Labels.Camion, disabled: true },
        tipoProducto: { value: '', disabled: true }
      }),
      documentoPorte: fb.group({
        tipoDocumentoPorte: [''],
        numeroDocumentoPorte: [{ value: '', disabled: false }],
    }),
    datosDocumento: fb.group({
      patentes: fb.group({
        patenteCamion: [{value: '', disabled: true}],
        patenteAcoplado: [{value: '', disabled: true}],
      }),
      tarjeta: {valie: '', disabled: true},
      observaciones: { value: '', disabled: false },
      chofer: { value: '', disabled: true },
      numeroContrato: { value: '', disabled: true },
      destino: { value: '', disabled: true },
      ordenCarga: { value: '', disabled: true },
      fechaVencimiento: [{ value: '23/10/2019', disabled: false }],
      estadoViaje: { value: '', disabled: true },
      tipoCartaPorte: { value: TiposCartaPorte.CpEmitida , disabled: true },
      estadoCabecera: { value: '', disabled: true },
      numeroCEE: [''],
      campoEpa: { value: '', disabled: true },
      cosecha: { value: '', disabled: true },
      producto: [{value: '', disabled: true}] ,
      titular: [{ value: '', disabled: true }],
      vendedor: { value: '', disabled: true },
      opONCCAVendedor: { value: '', disabled: true },
      intermediario: { value: '', disabled: true },
      opONCCAIntermediario: { value: '', disabled: true },
      remitenteComercial: { value: '', disabled: true },
      opONCCARemitenteComercial: { value: '', disabled: true },
      corredorComprador: [{ value: '', disabled: true }],
      tipoPesada: { value: '', disabled: false },
      corredorVendedor: { value: '', disabled: true },
      entregador: { value: '', disabled: true },
      cantidadEst: { value: '', disabled: true },
      destinatario: [{ value: '', disabled: true }],
      finalidad: [{value: '', disabled: true}],
      sedeOrigen: [{value: '', disabled: true} ],
      establecimiento: {value: '', disabled: true},
      procedencia: [{value: '', disabled: true}],
      sedeDestino: [{value: '', disabled: true} ],
      transportista: { value: '', disabled: true },
      kilometrosRecorridos: { value: '', disabled: true },
      usuarioAltaCarga: {value: '', disabled: true},
      datosEntrega: fb.group({
        calle: {value: '', disabled: true},
        numero: {value: '', disabled: true},
        localidad: {value: '', disabled: true},
        codigoPostal: {value: '', disabled: true},
        provincia: {value: '', disabled: true}
      })
    })
  });
  fcService.initialize(component.form);
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlarCargaCamionComponent);
    component = fixture.componentInstance;
    fcService = TestBed.get(FormComponentService);
    fb = new FormBuilder();
    component.movimientoCarga = new MovimientoCargaCamion(new Circuito(), new EstadoMovimiento(1, 'ninguno'));
    createForm();
    const ldc = new Sociedad(1, 'ldc');
    const sede = new Sede(1, '0001', 'sede');
    const puerto = new Puerto(1, 'puerto', false);
    component.tipoProductoSeleccionada = new Producto(1, '200', 'producto', false);
    component.terminal = new Terminal(1, 'BB', true, ldc, sede, puerto, 'codigo', false, true, false, false);
    component.documentoPorte = TestBed.get(DocumentoPorteComponent);
    component.modalAsignarTarjeta = TestBed.get(ModalAsignarTarjetaComponent);
    spyOn(component.documentoPorte, 'setFocus').and.returnValue(of());
    spyOn<any>(component, 'setChildFormControl').and.returnValue(of());
    spyOn(component.modalAsignarTarjeta, 'abrir').and.returnValue({});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo onClickAceptar', () => {
    it('Invoca al metodo verificarFechaVencimiento', () => {
      // Arrange
      spyOn<any>(component, 'verificarFechaVencimiento');
      // Act
      component.onClickAceptar();
      // Assert
      expect(component['verificarFechaVencimiento']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo mapControlsToCommand', () => {
    beforeEach(() => {
      component.movimientoCarga = new MovimientoCargaCamion(new Circuito(), new EstadoMovimiento(1, 'ninguno'));
      component.movimientoCarga.version = '';
    });

    it('Setea las observaciones', () => {
      // Arrange
      const esperado = 'observaciones';
      fcService.setValue('datosDocumento.observaciones', esperado, {onlySelf: true});
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.observaciones).toEqual(esperado);
    });

    it('Setea el tipoCartaPorte', () => {
      // Arrange
      const esperado = TiposCartaPorte.CpEmitida;
      fcService.setValue('datosDocumento.tipoCartaPorte', esperado, {onlySelf: true});
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.idTipoCartaPorte).toEqual(esperado);
    });

    it('Setea la fechaVencimiento', () => {
      // Arrange
      const esperado = '12/12/2019';
      fcService.setValue('datosDocumento.fechaVencimiento', esperado, {onlySelf: true});
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.fechaVencimiento).toEqual(esperado);
    });

    it('Setea el numeroCee', () => {
      // Arrange
      const esperado = 2344342;
      fcService.setValue('datosDocumento.numeroCEE', esperado, {onlySelf: true});
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.numeroCEE).toEqual(esperado);
    });

    it('Setea el tipo pesaje', () => {
      // Arrange
      const esperado = 111;
      fcService.setValue('datosDocumento.tipoPesada', esperado, {onlySelf: true});
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.idTipoPesada).toEqual(esperado);
    });

    it('Setea el tipo documento Porte', () => {
      // Arrange
      const esperado = TiposDocumentoPorte.CartaDePorte;
      fcService.setValue('documentoPorte.tipoDocumentoPorte', {id: esperado}, {onlySelf: true});
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.idTipoDocumentoPorte).toEqual(esperado);
    });

    it('Setea el numero DocumentoPorte', () => {
      // Arrange
      const esperado = 234234242442;
      fcService.setValue('documentoPorte.numeroDocumentoPorte', esperado, {onlySelf: true});
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.numeroDocumentoPorte).toEqual(esperado);
    });

    it('Setea el id de movimiento', () => {
      // Arrange
      component.idMovimiento = 1;
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.id).toEqual(component.idMovimiento);
    });

    it('Setea el id de viaje', () => {
      // Arrange
      component.idViaje = 1;
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.idViaje).toEqual(component.idViaje);
    });

    it('Setea el id de actividad', () => {
      // Arrange
      component.idActividad = 1;
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.idActividad).toEqual(component.idActividad);
    });

    it('Setea el tipoProducto', () => {
      // Arrange
      component.tipoProductoSeleccionada = new Producto(1, '200', 'producto', false);
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.idTipoProducto).toEqual(component.tipoProductoSeleccionada.id);
    });

    it('Setea la version', () => {
      // Arrange
      component.movimientoCarga.version = '23123423423';
      // Act
      const resultado = (component as any).mapControlsToCommand();
      // Assert
      expect(resultado.version).toEqual(component.movimientoCarga.version);
    });

  });
});
