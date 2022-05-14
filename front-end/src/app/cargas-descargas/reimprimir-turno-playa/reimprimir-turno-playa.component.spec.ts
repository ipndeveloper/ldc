import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimprimirTurnoPlayaComponent } from './reimprimir-turno-playa.component';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ReimprimirTurnoPlayaService } from './reimprimir-turno-playa.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopupService } from '../../core/services/popupService/popup.service';
import { of } from 'rxjs';
import { Resources } from '../../../locale/artifacts/resources';
import { ReimprimirTurnoPlayaDataView } from '../../shared/data-models/reimprimir-turno-playa-data-view';
import { TiposMovimiento, EstadosMovimiento } from '../../shared/enums/enums';

describe('ReimprimirTurnoPlayaComponent', () => {
  let component: ReimprimirTurnoPlayaComponent;
  let fixture: ComponentFixture<ReimprimirTurnoPlayaComponent>;
  let service: ReimprimirTurnoPlayaService;
  let fcService: FormComponentService;
  let popupService: PopupService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ReimprimirTurnoPlayaComponent],
      imports: [TestModule],
      providers: [
        FormBuilder,
        FormComponentService,
        ReimprimirTurnoPlayaService,
        PopupService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimprimirTurnoPlayaComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ReimprimirTurnoPlayaService);
    fcService = TestBed.get(FormComponentService);
    popupService = TestBed.get(PopupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método onClickBuscar', () => {
    it('Invoca al get del ReimprimirTurnoPlayaService', () => {
      // Arrange
      spyOn(fcService, 'getValue').and.returnValue(true);
      spyOn(service, 'get').and.returnValue(of(undefined));

      // Act
      component.onClickBuscar();

      // Assert
      expect(service.get).toHaveBeenCalledTimes(1);
    });

    it('Invoca al get del service con tipoDocumentodePorte y numeroDocumentoPorte', () => {
      // Arrange
      const tipoDocumentoPorte = 'Documento de Porte';
      const numeroDocumentoPorte = '12345678';
      const idVendedor = 2;
      const ctg = 123;
      spyOn(fcService, 'getValue').and.callFake((param: string) => {
        switch (param) {
          case 'filtro.vendedor':
            return idVendedor;
          case 'filtro.tipoDocumentoPorte':
            return tipoDocumentoPorte;
          case 'filtro.numeroDocumentoPorte':
            return numeroDocumentoPorte;
          case 'filtro.ctg':
            return ctg;
        }
      });
      spyOn(service, 'get').and.returnValue(of({}));
      spyOn((component as any), 'validarEstadoMovimiento').and.returnValue(false);

      // Act
      component.onClickBuscar();

      // Assert
      expect(service.get).toHaveBeenCalledWith(tipoDocumentoPorte, numeroDocumentoPorte, ctg, idVendedor);
    });

    it('Invoca al validarEstadoMovimiento', () => {
      // Arrange
      spyOn(fcService, 'getValue').and.returnValue(true);
      spyOn(service, 'get').and.returnValue(of({}));
      spyOn((component as any), 'validarEstadoMovimiento').and.returnValue(false);

      // Act
      component.onClickBuscar();

      // Assert
      expect((component as any).validarEstadoMovimiento).toHaveBeenCalledTimes(1);
    });

    it('Invoca al validarMovimientoEnCircuito', () => {
      // Arrange
      spyOn(fcService, 'getValue').and.returnValue(true);
      spyOn(service, 'get').and.returnValue(of({}));
      spyOn((component as any), 'validarMovimientoEnCircuito').and.returnValue(false);

      // Act
      component.onClickBuscar();

      // Assert
      expect((component as any).validarMovimientoEnCircuito).toHaveBeenCalledTimes(1);
    });

    it('Invoca al loadMovimiento', () => {
      // Arrange
      spyOn(fcService, 'getValue').and.returnValue(true);
      spyOn(service, 'get').and.returnValue(of({}));
      spyOn((component as any), 'validarEstadoMovimiento').and.returnValue(true);
      spyOn((component as any), 'validarMovimientoEnCircuito').and.returnValue(true);
      spyOn((component as any), 'loadMovimiento');
      spyOn((component as any), 'disableAfterSearch');

      // Act
      component.onClickBuscar();

      // Assert
      expect((component as any).loadMovimiento).toHaveBeenCalledTimes(1);
    });

    it('Emite popup de error al no encontrar movimiento', () => {
      // Arrange
      spyOn(fcService, 'getValue').and.returnValue(true);
      spyOn(service, 'get').and.returnValue(of(undefined));
      spyOn(popupService, 'error');

      // Act
      component.onClickBuscar();

      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
    });

    it('Emite popup de error con los mensajes correspondientes', () => {
      // Arrange
      spyOn(fcService, 'getValue').and.returnValue(true);
      spyOn(service, 'get').and.returnValue(of(undefined));
      spyOn(popupService, 'error');

      // Act
      component.onClickBuscar();

      // Assert
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.NoSeEncontraronResultados, Resources.Labels.Error);
    });
  });

  describe('El método onClickReimprimir', () => {
    it('Invoca al reimprimirTurnoPlaya del servicio', () => {
      // Arrange
      component.movimientoDataView = { id: 1 } as ReimprimirTurnoPlayaDataView;
      spyOn(fcService, 'isValidForm').and.returnValue(true);
      spyOn(fcService, 'getValue').and.returnValue(true);
      spyOn(service, 'reimprimirTurnoPlaya').and.returnValue(of({}));
      spyOn((component as any), 'cancelar');

      // Act
      component.onClickReimprimir();

      // Assert
      expect(service.reimprimirTurnoPlaya).toHaveBeenCalledTimes(1);
    });

    it('Completa la lista de errores si el fomulario no es válido', () => {
      // Arrange
      component.form = {} as FormGroup;
      spyOn(fcService, 'isValidForm').and.returnValue(false);
      spyOn(fcService, 'validateForm');
      spyOn(fcService, 'showValidationError');

      // Act
      component.onClickReimprimir();

      // Assert
      expect(fcService.validateForm).toHaveBeenCalledTimes(1);
    });

    it('Muestra la lista de errores cuando el formulario no es válido', () => {
      // Arrange
      component.form = {} as FormGroup;
      spyOn(fcService, 'isValidForm').and.returnValue(false);
      spyOn(fcService, 'validateForm');
      spyOn(fcService, 'showValidationError');

      // Act
      component.onClickReimprimir();

      // Assert
      expect(fcService.showValidationError).toHaveBeenCalledTimes(1);
    });
  });

  describe('El método validarEstadoMovimiento', () => {
    it('Devuelve el resultado válido para el tipo de movimiento descarga', () => {
      // Arrange
      component.movimientoDataView = { idTipoMovimiento: TiposMovimiento.Descarga } as ReimprimirTurnoPlayaDataView;

      // Act
      const resultado = (component as any).validarEstadoMovimiento();

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('Devuelve el resultado inválido para el tipo de movimiento carga', () => {
      // Arrange
      component.movimientoDataView = { idTipoMovimiento: TiposMovimiento.Carga } as ReimprimirTurnoPlayaDataView;
      spyOn(popupService, 'error');

      // Act
      const resultado = (component as any).validarEstadoMovimiento();

      // Assert
      expect(resultado).toBeFalsy();
    });

    it('Muestra popup error para el tipo de movimiento carga', () => {
      // Arrange
      component.movimientoDataView = { idTipoMovimiento: TiposMovimiento.Carga } as ReimprimirTurnoPlayaDataView;
      spyOn(popupService, 'error');

      // Act
      (component as any).validarEstadoMovimiento();

      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
    });

    it('Informa error correspondiente para el tipo de movimiento carga', () => {
      // Arrange
      component.movimientoDataView = { idTipoMovimiento: TiposMovimiento.Carga } as ReimprimirTurnoPlayaDataView;
      spyOn(popupService, 'error');

      // Act
      (component as any).validarEstadoMovimiento();

      // Assert
      expect(popupService.error).toHaveBeenCalledWith(
        Resources.Messages.LosDatosIngresadosNoIdentificanUnCamionEnCircuitoDeCarga,
        Resources.Labels.Error
      );
    });
  });

  describe('El método validarMovimientoEnCircuito', () => {
    it('Devuelve el resultado válido para un movimiento en circuito', () => {
      // Arrange
      component.movimientoDataView = { idEstadoMovimiento: EstadosMovimiento.AptoBalanzaEntrada } as ReimprimirTurnoPlayaDataView;

      // Act
      const resultado = (component as any).validarMovimientoEnCircuito();

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('Devuelve el resultado inválido para un movimiento fuera de circuito', () => {
      // Arrange
      component.movimientoDataView = { idEstadoMovimiento: EstadosMovimiento.Finalizado } as ReimprimirTurnoPlayaDataView;

      // Act
      const resultado = (component as any).validarMovimientoEnCircuito();

      // Assert
      expect(resultado).toBeFalsy();
    });

    it('Muestra popup error para un movimiento fuera de estado', () => {
      // Arrange
      component.movimientoDataView = { idEstadoMovimiento: EstadosMovimiento.Finalizado } as ReimprimirTurnoPlayaDataView;
      spyOn(popupService, 'error');

      // Act
      (component as any).validarMovimientoEnCircuito();

      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
    });

    it('Informa error correspondiente para un movimiento fuera de estado', () => {
      // Arrange
      component.movimientoDataView = { idEstadoMovimiento: EstadosMovimiento.Finalizado } as ReimprimirTurnoPlayaDataView;
      spyOn(popupService, 'error');

      // Act
      (component as any).validarMovimientoEnCircuito();

      // Assert
      expect(popupService.error).toHaveBeenCalledWith(
        Resources.Messages.ElCamionNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion,
        Resources.Labels.Error
      );
    });
  });
});
