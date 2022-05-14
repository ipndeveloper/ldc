import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDocumentoValidarCupoComponent } from './datos-documento-validar-cupo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TiposMovimientoEtiqueta } from '../../../shared/enums/enums';
import { Producto } from '../../../shared/data-models/producto';
import { Vendedor } from '../../../shared/data-models/vendedor';
import { CorredorComprador } from '../../../shared/data-models/corredor-comprador';
import { Destinatario } from '../../../shared/data-models/destinatario';
import { Sede } from '../../../shared/data-models/sede';
import { Finalidad } from '../../../shared/data-models/finalidad';
import { DispositivoService } from '../../shared/services/dispositivo.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { CodigoCupo } from '../../../shared/data-models/codigo-cupo';

describe('DatosDocumentoValidarCupoComponent', () => {
  let component: DatosDocumentoValidarCupoComponent;
  let fixture: ComponentFixture<DatosDocumentoValidarCupoComponent>;
  let fcService: FormComponentService;
  let form: FormGroup;
  let cupoDataView: CodigoCupo;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ DatosDocumentoValidarCupoComponent ],
      providers: [FormComponentService,
                  DispositivoService,
                  PopupService,
                  ParametrosTerminalService],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fcService = TestBed.get(FormComponentService);
    createForm();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDocumentoValidarCupoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function createForm(): void {
    const fb = new FormBuilder();
    form = fb.group({
      circuito: fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: TiposMovimientoEtiqueta.Descarga, disabled: true },
        tipoTransporte: { value: '', disabled: true },
        tipoProducto: { value: '', disabled: false }
      }),
      documentoPorte: fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        numeroDocumentoPorte: { value: '', disabled: false },
      }),
      cupo: fb.group({
        codigoCupo: { value: '', disabled: false },
        conCupo: {value: '', disabled: false}
      }),
      datosDocumento: fb.group({
        producto: { value: '', disabled: false },
        vendedor: { value: '', disabled: false },
        corredorComprador: { value: '', disabled: false },
        destinatario: { value: '', disabled: false },
        sedeOrigen: { value: '', disabled: false },
        finalidad: { value: '', disabled: false },
      })
    });
    fcService.initialize(form);
  }

  describe('El metodo loadDatosCupo', () => {
    beforeEach(() => {
      cupoDataView = new CodigoCupo();
    });
    it('Invoca al metodo setValue del formcomponentService para setear el producto', () => {
      // Arrange
      cupoDataView.producto = new Producto(1, '01', 'producto', true );
      spyOn(fcService, 'setValue');
      // Act
      component['loadDatosCupo'](cupoDataView);
      // Assert
      expect(fcService.setValue).toHaveBeenCalledWith(`datosDocumento.producto`, cupoDataView.producto, {onlySelf: true});
    });

    it('Invoca al metodo setValue del formcomponentService para setear el vendedor', () => {
      // Arrange
      cupoDataView.vendedor = new Vendedor(1, '01', 'vendedor', 1);
      spyOn(fcService, 'setValue');
      // Act
      component['loadDatosCupo'](cupoDataView);
      // Assert
      expect(fcService.setValue).toHaveBeenCalledWith(`datosDocumento.vendedor`, cupoDataView.vendedor, {onlySelf: true});
    });

    it('Invoca al metodo setValue del formcomponentService para setear el corredor', () => {
      // Arrange
      cupoDataView.corredorComprador = new CorredorComprador(1, '01', 'corredor', 1);
      spyOn(fcService, 'setValue');
      // Act
      component['loadDatosCupo'](cupoDataView);
      // Assert
      expect(fcService.setValue).toHaveBeenCalledWith(`datosDocumento.corredorComprador`, cupoDataView.corredorComprador, {onlySelf: true});
    });

    it('Invoca al metodo setValue del formcomponentService para setear el destinatario', () => {
      // Arrange
      cupoDataView.destinatario = new Destinatario(1, '01', 'destinatario', '', 1);
      spyOn(fcService, 'setValue');
      // Act
      component['loadDatosCupo'](cupoDataView);
      // Assert
      expect(fcService.setValue).toHaveBeenCalledWith(`datosDocumento.destinatario`, cupoDataView.destinatario, {onlySelf: true});
    });

    it('Invoca al metodo setValue del formcomponentService para setear la sede', () => {
      // Arrange
      cupoDataView.sedeOrigen = new Sede(1, '01', 'sede');
      spyOn(fcService, 'setValue');
      // Act
      component['loadDatosCupo'](cupoDataView);
      // Assert
      expect(fcService.setValue).toHaveBeenCalledWith(`datosDocumento.sedeOrigen`, cupoDataView.sedeOrigen, {onlySelf: true});
    });

    it('Invoca al metodo setValue del formcomponentService para setear la finalidad', () => {
      // Arrange
      cupoDataView.finalidad = new Finalidad(1, 'finalidad');
      spyOn(fcService, 'setValue');
      // Act
      component['loadDatosCupo'](cupoDataView);
      // Assert
      expect(fcService.setValue).toHaveBeenCalledWith(`datosDocumento.finalidad`, cupoDataView.finalidad, {onlySelf: true});
    });
  });
});
