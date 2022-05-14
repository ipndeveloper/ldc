import {  ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ReversarSalidaComponent } from './reversar-salida.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestModule } from '../../core/mocks/test.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchReversarSalidaService } from './services/search-reversar-salida.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { TipoTransporteService } from '../../shared/desplegable-tipo-transporte/desplegable-tipo-transporte.service';
import { TipoMovimientoService } from '../../shared/desplegable-tipo-movimiento/tipo-movimiento.service';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { PatenteService } from '../shared/services/patente.service';
import { ProductoService } from '../../shared/buscador-producto/producto.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { ReversarSalidaService } from './services/reversar-salida.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { Resources } from '../../../locale/artifacts/resources';
import { PopupService } from '../../core/services/popupService/popup.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('ReversarSalidaComponent', () => {
  let component: ReversarSalidaComponent;
  let fixture: ComponentFixture<ReversarSalidaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReversarSalidaComponent,
       ],
      imports: [
        ReactiveFormsModule,
        TestModule,
        NgxDatatableModule,
        NgbModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        SearchReversarSalidaService,
        SearchFormActionsNotifierService,
        TipoTransporteService,
        TipoMovimientoService,
        EstadoMovimientoService,
        DropdownNotificationService,
        PatenteService,
        ProductoService,
        TipoDocumentoPorteService,
        ReversarSalidaService,
        ExcelService,
        CircuitoService,
        FormComponentService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversarSalidaComponent);
    component = fixture.componentInstance;
    spyOn<any>(component, 'completeEstadoMovimientos');
    spyOn<any>(component, 'subscribeToActionEventsPrivate');
    spyOn<any>(component, 'subscribeToFiltersChanges');
    spyOn<any>(component, 'subscribeToDropDownEvents').and.returnValue(of(1));
    spyOn<any>(component, 'setValuesByDefault');
    spyOn<any>(component, 'search');

    const fcService = TestBed.get(FormComponentService);
    spyOn(fcService, 'resetForm');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo onClickReversarSalida', () => {

    it('llama al popupService.error cuando se seleccionó mas de un registro',
    inject([PopupService],
      (popupService: PopupService) => {

        // Arrange
        spyOn(popupService, 'error');
        component.selectedRow = [{}, {}];
        // Act
        component.onClickReversarSalida();

        // Assert
        expect(popupService.error).toHaveBeenCalledTimes(1);
      }));

      it('llama al popupService.error con el mensaje definido cuando se seleccionó mas de un registro ',
      inject([PopupService],
        (popupService: PopupService) => {
          // Arrange
          spyOn(popupService, 'error');
          component.selectedRow = [{}, {}];

          // Act
          component.onClickReversarSalida();

          // Assert
          expect(popupService.error)
                .toHaveBeenCalledWith(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.ReversarSalida);
        }));

      it('Invoca al metodo modalReversarSalida.open cuando se seleccionó un solo registro', () => {
        // Arrange
        component.modalReversarSalida.open = jasmine.createSpy('open');
        component.selectedRow = [{}];
        const service = TestBed.get(SearchReversarSalidaService);
        spyOn(service, 'getResultadosParaReversar').and.returnValue(of([{}]));

        // Act
        component.onClickReversarSalida();

        // Assert
        expect(component.modalReversarSalida.open).toHaveBeenCalledTimes(1);
      });
  });

  describe('El metodo onConfirmReversarSalida', () => {

    it('Invoca al metodo popupService.success',
      inject([PopupService],
        (popupService: PopupService) => {
          // Arrange
          spyOn(popupService, 'success');
          const mensaje = '';
          // Act
          component.onConfirmReversarSalida(mensaje);

          // Assert
          expect(popupService.success).toHaveBeenCalledTimes(1);

      }));

    it('Invoca al metodo popupService.success con el mesaje definido',
      inject([PopupService],
        (popupService: PopupService) => {
          // Arrange
          spyOn(popupService, 'success');
          const mensaje = '';
          // Act
          component.onConfirmReversarSalida(mensaje);

          // Assert
          expect(popupService.success).toHaveBeenCalledWith(mensaje, Resources.Labels.ReversarSalida);

        }));

    it('Invoca al metodo notificationActionsService.onRefreshGrid',
    inject([SearchFormActionsNotifierService],
      (searchFormActionsNotifierService: SearchFormActionsNotifierService) => {
        // Arrange
        spyOn(searchFormActionsNotifierService, 'onRefreshGrid');
        const mensaje = '';

        // Act
        component.onConfirmReversarSalida(mensaje);

        // Assert
        expect(searchFormActionsNotifierService.onRefreshGrid).toHaveBeenCalledTimes(1);
      }));
  });
});
