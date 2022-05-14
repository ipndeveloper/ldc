import {  TestBed } from '@angular/core/testing';

import { DatosDocumentoCerealesComponent } from './datos-documento-cereales.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DescargaEventsNotifierService } from '../services/descarga-events-notifier.service';
import { ParametrosTerminalService } from '../services/parametros-terminal.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TipoFinalidad, Sociedades } from '../../../shared/enums/enums';
import { Sede } from '../../../shared/data-models/sede';
import { Terminal } from '../../../shared/data-models/terminal';
import { Sociedad } from '../../../shared/data-models/sociedad';
import { of } from 'rxjs';
import { ApiService } from '../../../core/services/restClient/api.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { CupoService } from '../cupo/service/cupo.service';
import { Puerto } from '../../../shared/data-models/puerto';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { AdministrarProductosHabilitadosPorTerminalService } from '../../administrar-productos-habilitados-por-terminal/administrar-productos-habilitados-por-terminal.service';

describe('DatosDocumentoCerealesComponent', () => {
  let component: DatosDocumentoCerealesComponent;
  let eventsNotifierService: DescargaEventsNotifierService;
  let parametrosTerminalService: ParametrosTerminalService;
  let popupService: PopupService;
  let cupoService: CupoService;
  let fcService: FormComponentService;
  let fb: FormBuilder;
  let esAcopio: boolean;
  let finalidadService: FinalidadService;
  let authService: AuthService;
  let productosHabilitadosPorTerminalService: AdministrarProductosHabilitadosPorTerminalService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        DescargaEventsNotifierService,
        ParametrosTerminalService,
        FormComponentService,
        PopupService,
        CupoService,
        FinalidadService,
        AuthService,
        AdministrarProductosHabilitadosPorTerminalService
      ],
      imports: [
        ReactiveFormsModule,
        TestModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    });
  });

  beforeEach(() => {
    esAcopio = true;
    eventsNotifierService = TestBed.get(DescargaEventsNotifierService);
    parametrosTerminalService = TestBed.get(ParametrosTerminalService);
    popupService = TestBed.get(PopupService);
    cupoService = TestBed.get(CupoService);
    finalidadService = TestBed.get(FinalidadService);
    authService = TestBed.get(AuthService);
    productosHabilitadosPorTerminalService = TestBed.get(AdministrarProductosHabilitadosPorTerminalService);

    fcService = TestBed.get(FormComponentService);

    const apiService = TestBed.get(ApiService);
    component = new DatosDocumentoCerealesComponent(eventsNotifierService,
                                                    parametrosTerminalService,
                                                    fcService,
                                                    apiService,
                                                    cupoService,
                                                    popupService,
                                                    finalidadService,
                                                    authService,
                                                    productosHabilitadosPorTerminalService);
    createForm();
    setFormValue();
  });

  function createForm() {
    fb = new FormBuilder();
    component.datosDocumentoForm = fb.group({
            vendedor: {id: Sociedades.LDC, descripcion: 'LDC'},
            destinatario: {id: Sociedades.LDC, descripcion: 'LDC'},
            finalidad: {id: TipoFinalidad.CompraVenta, descripcion: 'CompraVenta'},
            procedencia: {value: '' },
            sedeOrigen: {value: ''},
            sedeDestino: {value: ''},
            remitenteComercial: {value: ''},
            titularCartaPorte: {value: ''},
            producto: {value: ''},
            sustentabilidad: [undefined]
          });

    fcService.form = component.datosDocumentoForm;
  }

  function setFormValue() {
    const sociedad = new Sociedad(Sociedades.LDC, 'ldc');
    const sede = new Sede(1, '111', 'sede');
    const puerto = new Puerto(1, 'puerto', esAcopio);
    component.terminal = new Terminal(1, 'terminal', true, sociedad , sede, puerto, 'codigoAfip', true, true, false, false);
  }

  function setControlValue( controlName: string, value: number) {
    const control = component.datosDocumentoForm.get(controlName);
    if (control) {
     control.setValue({id: value});
    }
  }

   function mockSubscribes() {
    spyOn<any>(component, 'subscribeCambioProducto').and.returnValue(of());
    spyOn<any>(component, 'subscribeCambioSustentabilidad').and.returnValue(of());
    spyOn<any>(component, 'subscribeCambioNoLlevaEstablecimiento').and.returnValue(of());
    spyOn<any>(component, 'subscribeCambioCampoEpaSustentable').and.returnValue(of());

    spyOn<any>(component, 'subscribeCambioFinalidad').and.returnValue(of());
    spyOn<any>(component, 'subscribeCambioVendedor').and.returnValue(of());
    spyOn<any>(component, 'subscribeCambioDestinatario').and.returnValue(of());
    spyOn<any>(component, 'subscribeCambioIntermediario').and.returnValue(of());
    spyOn<any>(component, 'subscribeCambioTitularRemitenteComercial').and.callThrough();
    spyOn<any>(component, 'subscribeCambioTitular').and.returnValue(of());
    spyOn<any>(component, 'subscribeRemitenteComercial').and.returnValue(of());
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo subscribirseCambiosDocumentoCereales', () => {
    beforeEach(() => {
      mockSubscribes();
    });
    it('Invoca al metodo subscribeCambioProducto', () => {
      // Arrange

      // Act
      component['subscribirseCambiosDocumentoCereales']();
      // Assert
      expect(component['subscribeCambioProducto']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeCambioSustentabilidad', () => {
      // Arrange

      // Act
      component['subscribirseCambiosDocumentoCereales']();
      // Assert
      expect(component['subscribeCambioSustentabilidad']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeCambioNoLlevaEstablecimiento', () => {
      // Arrange

      // Act
      component['subscribirseCambiosDocumentoCereales']();
      // Assert
      expect(component['subscribeCambioNoLlevaEstablecimiento']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeCambioCampoEpaSustentable', () => {
      // Arrange

      // Act
      component['subscribirseCambiosDocumentoCereales']();
      // Assert
      expect(component['subscribeCambioCampoEpaSustentable']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo subscribirseCambiosDocumentoCereales', () => {
    beforeEach(() => {
      mockSubscribes();
    });
    it('Invoca al metodo subscribeCambioFinalidad', () => {
      // Arrange

      // Act
      component['subscribirseCambiosDocumento']();
      // Assert
      expect(component['subscribeCambioFinalidad']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeCambioVendedor', () => {
      // Arrange

      // Act
      component['subscribirseCambiosDocumento']();
      // Assert
      expect(component['subscribeCambioVendedor']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeCambioDestinatario', () => {
      // Arrange

      // Act
      component['subscribirseCambiosDocumento']();
      // Assert
      expect(component['subscribeCambioDestinatario']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeCambioIntermediario', () => {
      // Arrange

      // Act
      component['subscribirseCambiosDocumento']();
      // Assert
      expect(component['subscribeCambioIntermediario']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeCambioTitularRemitenteComercial', () => {
      // Arrange

      // Act
      component['subscribirseCambiosDocumento']();
      // Assert
      expect(component['subscribeCambioTitularRemitenteComercial']).toHaveBeenCalledTimes(1);
    });

  });

  describe('El metodo subscribeCambioTitularRemitenteComercial', () => {

    beforeEach(() => {
      mockSubscribes();
    });

    it('Invoca al metodo subscribeCambioTitular', () => {
      // Arrange

      // Act
      component['subscribeCambioTitularRemitenteComercial']();
      // Assert
      expect(component['subscribeCambioTitular']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeRemitenteComercial', () => {
      // Arrange

      // Act
      component['subscribeCambioTitularRemitenteComercial']();
      // Assert
      expect(component['subscribeRemitenteComercial']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo subscribeCambioFinalidad', () => {
    beforeEach(() => {
      component['subscribeCambioFinalidad']();
    });

    it('Invoca al metodo updateValueAndValidity del control destinatario', () => {
      // Arrange
      spyOn(component.datosDocumentoForm.controls.finalidad, 'updateValueAndValidity');
      // Act
      setControlValue('finalidad', TipoFinalidad.Transferencia);
      // Assert
      expect(component.datosDocumentoForm.controls.finalidad.updateValueAndValidity).toHaveBeenCalledTimes(1);
    });
  });

});
