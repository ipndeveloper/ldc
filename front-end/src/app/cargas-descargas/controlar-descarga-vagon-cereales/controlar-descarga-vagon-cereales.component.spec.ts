import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlarDescargaVagonCerealesComponent } from './controlar-descarga-vagon-cereales.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { CircuitoService } from '../shared/services/circuito.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AuthService } from '../../core/services/session/auth.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ControlarDescargaVagonCerealesService } from './controlar-descarga-vagon-cereales.service';
import { of } from 'rxjs';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { Resources } from '../../../locale/artifacts/resources';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { MovimientoCerealGrano } from '../../shared/data-models/movimiento-cereal-grano';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MovimientoService } from '../shared/services/movimiento.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { CommandService } from '../../shared/command-service/command.service';

xdescribe('ControlarDescargaVagonCerealesComponent', () => {
  let component: ControlarDescargaVagonCerealesComponent;
  let fixture: ComponentFixture<ControlarDescargaVagonCerealesComponent>;
  let service: ControlarDescargaVagonCerealesService;
  let popupService: PopupService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ControlarDescargaVagonCerealesComponent,
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
        DescargaEventsNotifierService,
        AuthService,
        NavigationService,
        CircuitoService,
        ControlarDescargaVagonCerealesService,
        FormComponentService,
        MovimientoService,
        CommandService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ControlarDescargaVagonCerealesService);
    popupService = TestBed.get(PopupService);

    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get');
    spyOn(apiService, 'post');

    const circuitoService = TestBed.get(CircuitoService);
    spyOn(circuitoService, 'getCircuito').and.returnValue(of(new Circuito()));

    const formService = TestBed.get(FormComponentService);
    spyOn(formService, 'resetForm');
    spyOn(formService, 'setValue');

    fixture = TestBed.createComponent(ControlarDescargaVagonCerealesComponent);
    component = fixture.componentInstance;
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
});
