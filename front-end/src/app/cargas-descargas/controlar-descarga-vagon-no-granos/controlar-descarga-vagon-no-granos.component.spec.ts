import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlarDescargaVagonNoGranosComponent } from './controlar-descarga-vagon-no-granos.component';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { CircuitoService } from '../shared/services/circuito.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Terminal } from '../../shared/data-models/terminal';
import { Sociedad } from '../../shared/data-models/sociedad';
import { Sede } from '../../shared/data-models/sede';
import { ControlarDescargaVagonNoGranosService } from './controlar-descarga-vagon-no-granos.service';
import { MovimientoCerealGrano } from '../../shared/data-models/movimiento-cereal-grano';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { of } from 'rxjs';
import { Resources } from '../../../locale/artifacts/resources';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponentService } from '../../../app/core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../app/core/services/navigationService/navigation.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { AuthService } from '../../../app/core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { CommandService } from '../../shared/command-service/command.service';
import { TipoDocumentoPorte } from '../shared/data-models/tipo-documento-porte';
import { Puerto } from '../../shared/data-models/puerto';

describe('ControlarDescargaVagonNoGranosComponent', () => {
  let component: ControlarDescargaVagonNoGranosComponent;
  let fixture: ComponentFixture<ControlarDescargaVagonNoGranosComponent>;
  let service: ControlarDescargaVagonNoGranosService;
  let popupService: PopupService;
  let navigationService: any;

  configureTestSuite(() => {
    const navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['navigateBack', 'requestExtras', 'clearCache']);

    TestBed.configureTestingModule({
      declarations: [
        ControlarDescargaVagonNoGranosComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule,
        RouterTestingModule
      ],
      providers : [
        ControlarDescargaVagonNoGranosService,
        CircuitoService,
        FormComponentService,
        { provide: NavigationService, useValue: navigationServiceSpy },
        MovimientoService,
        AuthService,
        DescargaEventsNotifierService,
        CommandService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ControlarDescargaVagonNoGranosService);
    popupService = TestBed.get(PopupService);

    const circuitoService = TestBed.get(CircuitoService);
    spyOn(circuitoService, 'getCircuito').and.returnValue(of(new Circuito()));

    navigationService = TestBed.get(NavigationService);
    navigationService.requestExtras.and.returnValue(of({}));

    fixture = TestBed.createComponent(ControlarDescargaVagonNoGranosComponent);
    component = fixture.componentInstance;
    component.tipoDocumentoSeleccionado = new TipoDocumentoPorte(1, '');
    component.tipoDocumentoSeleccionado.mascara = '#-########';
    component.terminal = new Terminal(1, '', false,
      new Sociedad(1, ''), new Sede(1, '', ''), new Puerto(1, '', false), '1', true, true, false, false);

    component.documentoPorte.setFocus = jasmine.createSpy('setFocus');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo loadMovimiento', () => {
    let movimiento: MovimientoCerealGrano;

    beforeEach(() => {
      const circuito = new Circuito();
      const estadoMovimiento = new EstadoMovimiento(1, '');
      movimiento = new MovimientoCerealGrano(circuito, estadoMovimiento);
    });

    it('invoca al TodosVagonesFactiblesModificarFueraPuesto del service cuando esModificacionDocPorte', () => {
      // Arrange
      spyOnProperty(component, 'esModificacionDocPorte', 'get').and.returnValue(true);
      spyOn(service, 'TodosVagonesFactiblesModificarFueraPuesto').and.returnValue(of(true));

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(service.TodosVagonesFactiblesModificarFueraPuesto).toHaveBeenCalledTimes(1);
      expect(service.TodosVagonesFactiblesModificarFueraPuesto).toHaveBeenCalledWith(movimiento.nroDocumentoPorte);
    });

    it('invoca al warning del popupService cuando alguno de los vagones no esta factible de modificar el doc porte', () => {
      // Arrange
      spyOnProperty(component, 'esModificacionDocPorte', 'get').and.returnValue(true);
      spyOn(service, 'TodosVagonesFactiblesModificarFueraPuesto').and.returnValue(of(false));
      spyOn(popupService, 'warning');

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(popupService.warning).toHaveBeenCalledTimes(1);
      expect(popupService.warning).toHaveBeenCalledWith(
        Resources.Messages.ExistenVagonesDelDocumentoDePorteQueNoSePuedenModificarFueraDePuesto
      );
    });

    it('no invoca al warning del popupService cuando todos los vagones estan factibles de modificar el doc porte', () => {
      // Arrange
      spyOnProperty(component, 'esModificacionDocPorte', 'get').and.returnValue(true);
      spyOn(service, 'TodosVagonesFactiblesModificarFueraPuesto').and.returnValue(of(true));
      spyOn(popupService, 'warning');

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(popupService.warning).not.toHaveBeenCalled();
    });
  });

  describe('El metodo cancelar', () => {
    beforeEach(() => {
      spyOn(popupService, 'confirmOk');
    });

    it('invoca al confirmOk del popupService para confirmar la accion cuando no es consulta', () => {
      // Arrange
      component.esConsulta = false;

      // Act
      component.cancelar();

      // Assert
      expect(popupService.confirmOk).toHaveBeenCalled();
    });

    it('no invoca al confirmOk del popupService para confirmar la accion cuando es consulta', () => {
      // Arrange
      component.esConsulta = true;
      fixture.detectChanges();

      // Act
      component.cancelar();

      // Assert
      expect(popupService.confirmOk).not.toHaveBeenCalled();
    });
  });
});
