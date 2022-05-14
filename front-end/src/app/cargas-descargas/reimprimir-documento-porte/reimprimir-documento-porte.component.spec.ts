import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimprimirDocumentoPorteComponent } from './reimprimir-documento-porte.component';
import { ReimprimirDocumentoPorteService } from './reimprimir-documento-porte.service';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Resources } from '../../../locale/artifacts/resources';
import { ReimprimirDocumentoPorteDataView } from '../../shared/data-models/reimprimir-documento-porte-data-view';
import { EstadosMovimiento, TiposMovimiento } from '../../shared/enums/enums';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

describe('ReimprimirDocumentoPorteComponent', () => {
  let component: ReimprimirDocumentoPorteComponent;
  let fixture: ComponentFixture<ReimprimirDocumentoPorteComponent>;
  let service: ReimprimirDocumentoPorteService;
  let fcService: FormComponentService;
  let popupService: PopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ReimprimirDocumentoPorteComponent],
      providers: [
        FormComponentService,
        ReimprimirDocumentoPorteService,
        PopupService,
        TipoDocumentoPorteService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimprimirDocumentoPorteComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ReimprimirDocumentoPorteService);
    fcService = TestBed.get(FormComponentService);
    popupService = TestBed.get(PopupService);
    createForm();
    component.documentoPorteDataView = new ReimprimirDocumentoPorteDataView();
    component.desplegableImpresora.setFocus = jasmine.createSpy('setFocus');
  });

  function createForm() {
    const fb = new FormBuilder();
    component.reimprimirDocumentoPorteForm = fb.group({
      filtrosForm: fb.group({
        tipoDocumentoPorte: [{ value: '', disabled: false }],
        numeroDocumentoPorte: [{ value: '', disabled: false }],
        vendedor: [{ value: '', disabled: false }]
      }),
      datosMovimiento: fb.group({
        producto: { value: undefined, disabled: true },
        ordenCarga: { value: '', disabled: true },
        numeroViaje: { value: '', disabled: true },
        patenteCamion: { value: '', disabled: true },
        patenteAcoplado: { value: '', disabled: true },
        corredorComprador: { value: '', disabled: true },
        remitenteComercial: { value: '', disabled: true }
      })
  });
    fcService.initialize(component.reimprimirDocumentoPorteForm);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo onClickBuscar', () => {
    beforeEach(() => {
      component.documentoPorteDataView = new ReimprimirDocumentoPorteDataView();
    });

    it('Invoca al get del ReimprimirDocumentoPorteService', () => {
      // Arrange
      spyOn(service, 'get').and.returnValue(of(undefined));
      // Act
      component.onClickBuscar();
      // Assert
      expect(service.get).toHaveBeenCalledTimes(1);
    });

    it('Invoca al popupService.error cuando el movimientoDataView es null', () => {
      // Arrange
      spyOn(service, 'get').and.returnValue(of(undefined));
      spyOn(popupService, 'error');
      // Act
      component.onClickBuscar();
      // Assert
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.NoSeEncontraronResultados, Resources.Labels.Error);
    });

    it('Invoca al popupService.error cuando el movimiento no esta finalizado o rechazado', () => {
      // Arrange
      component.documentoPorteDataView.idEstadoMovimiento = EstadosMovimiento.AptoBalanzaEntrada;
      component.documentoPorteDataView.idTipoMovimiento = TiposMovimiento.Carga;
      spyOn(service, 'get').and.returnValue(of(component.documentoPorteDataView));
      spyOn(popupService, 'error');
      // Act
      component.onClickBuscar();
      // Assert
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.ElCamionIdentificadoNoHaFinalizadoLaCargaConExito,
                                                      Resources.Labels.Error);
    });

    it('Invoca al popupService.error cuando el movimiento es descarga', () => {
      // Arrange
      component.documentoPorteDataView.idTipoMovimiento = TiposMovimiento.Descarga;
      spyOn(service, 'get').and.returnValue(of(component.documentoPorteDataView));
      spyOn(popupService, 'error');
      // Act
      component.onClickBuscar();
      // Assert
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.LosDatosIngresadosNoIdentificanUnCamionEnCircuitoDeCarga,
                                                      Resources.Labels.Error);
    });

    it('No Invoca al popupService.error cuando el movimiento esta finalizado y es Carga', () => {
      // Arrange
      component.documentoPorteDataView.idEstadoMovimiento = EstadosMovimiento.Finalizado;
      component.documentoPorteDataView.idTipoMovimiento = TiposMovimiento.Carga;
      spyOn(popupService, 'error');
      spyOn(service, 'get').and.returnValue(of(component.documentoPorteDataView));
      // Act
      component.onClickBuscar();
      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(0);
    });

    it('Invoca al metodo loadMovimiento cuando el movimiento es de carga y esta fuera de circuito', () => {
      // Arrange
      component.documentoPorteDataView.idEstadoMovimiento = EstadosMovimiento.Finalizado;
      component.documentoPorteDataView.idTipoMovimiento = TiposMovimiento.Carga;
      spyOn<any>(component, 'loadMovimiento');
      spyOn(service, 'get').and.returnValue(of(component.documentoPorteDataView));
      spyOn((component as any), 'loadImpresoraDefecto');
      // Act
      component.onClickBuscar();
      // Assert
      expect(component['loadMovimiento']).toHaveBeenCalledTimes(1);
    });

    it('No Invoca al metodo loadMovimiento cuando el movimiento es de carga y esta fuera de circuito', () => {
      // Arrange
      component.documentoPorteDataView.idEstadoMovimiento = EstadosMovimiento.AptoBalanzaEntrada;
      component.documentoPorteDataView.idTipoMovimiento = TiposMovimiento.Carga;
      spyOn<any>(component, 'loadMovimiento');
      spyOn(service, 'get').and.returnValue(of(component.documentoPorteDataView));
      // Act
      component.onClickBuscar();
      // Assert
      expect(component['loadMovimiento']).toHaveBeenCalledTimes(0);
    });
  });

  describe('El metodo onClickReimprimir', () => {
    beforeEach(() => {
      spyOn(service, 'reimprimirTicket').and.returnValue(of({}));
    });

    it('Invoca al metodo reimprimirTicket del servicio cuando el form es valido', () => {
      // Arrange
      spyOn(fcService, 'isValidForm').and.returnValue(true);
      spyOn((component as any), 'cancelar');
      // Act
      component.onClickReimprimir();
      // Assert
      expect(service.reimprimirTicket).toHaveBeenCalledTimes(1);
    });

    it('No Invoca al metodo reimprimirTicket del servicio cuando el form es invalido', () => {
      // Arrange
      spyOn(fcService, 'isValidForm').and.returnValue(false);
      spyOn(fcService, 'validateForm');
      spyOn(fcService, 'showValidationError');
      // Act
      component.onClickReimprimir();
      // Assert
      expect(service.reimprimirTicket).toHaveBeenCalledTimes(0);
    });

    it('invoca al popupService cuando se realiza la impresion con exito', () => {
      // Arrange
      component.documentoPorteDataView = new ReimprimirDocumentoPorteDataView();
      spyOn(popupService, 'success');
      spyOn((component as any), 'cancelar');
      // Act
      component.onClickReimprimir();
      // Assert
      expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.ReimpresionExitosa);
    });

    it('invoca al metodo cancelar', () => {
      // Arrange
      component.documentoPorteDataView = new ReimprimirDocumentoPorteDataView();
      spyOn<any>(component, 'cancelar');
      // Act
      component.onClickReimprimir();
      // Assert
      expect(component['cancelar']).toHaveBeenCalledTimes(1);
    });
  });
});
