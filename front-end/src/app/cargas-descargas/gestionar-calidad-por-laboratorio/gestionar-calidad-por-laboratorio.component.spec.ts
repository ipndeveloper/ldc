import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCalidadPorLaboratorioComponent } from './gestionar-calidad-por-laboratorio.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../../core/components/modal/modal.module';
import { ProductoService } from '../../shared/buscador-producto/producto.service';
import { PatenteService } from '../shared/services/patente.service';
import { GestionarCalidadPorLaboratorioService } from './service/gestionar-calidad-por-laboratorio.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { DecisionLaboratorioService } from './service/decision-laboratorio.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ModalDetalleMuestrasComponent } from './modal-detalle-muestras/modal-detalle-muestras.component';
import { Circuito } from '../../shared/data-models/circuito/circuito';

describe('GestionarCalidadPorLaboratorioComponent', () => {
  let component: GestionarCalidadPorLaboratorioComponent;
  let fixture: ComponentFixture<GestionarCalidadPorLaboratorioComponent>;
  let service: EstadoMovimientoService;
  let fb: FormBuilder;
  let excelService: ExcelService;
  let popupService: PopupService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionarCalidadPorLaboratorioComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        NgxDatatableModule,
        TestModule,
        NgbModule,
        ModalModule
      ],
      providers : [
        ModalDetalleMuestrasComponent,
        DecisionLaboratorioService,
        DropdownNotificationService,
        ProductoService,
        SearchFormActionsNotifierService,
        ExcelService,
        CircuitoService,
        PatenteService,
        GestionarCalidadPorLaboratorioService,
        EstadoMovimientoService,
        PopupService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCalidadPorLaboratorioComponent);
    component = fixture.componentInstance;
    mockServices();
    component.circuito = new Circuito();
    spyOn(service, 'getEstadosMovimientoByIdByIdsActividad').and.returnValue(of(''));
    component.form = fb.group({
      filtros: fb.group({
        codigoMuestra: '',
        patente: [ '' ],
        producto: { value: undefined, disabled: false },
        turno: ''
      }),
    });
  });

  function mockServices() {
    service = TestBed.get(EstadoMovimientoService);
    fb = TestBed.get(FormBuilder);
    excelService = TestBed.get(ExcelService);
    popupService = TestBed.get(PopupService);
    component.modalDetalleMuestras = TestBed.get(ModalDetalleMuestrasComponent);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo clickExcelExport', () => {

    it('Invoca al metodo exportDataGridAsExcel del excelExportService', () => {
      // Arrange
      spyOn(excelService, 'exportDataGridAsExcel');
      // Act
      component['clickExcelExport']('');
      // Assert
      expect(excelService.exportDataGridAsExcel).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo createForm', () => {

      it('crea el form', () => {
        // Arrange

        // Act
        component['createForm']();

        // Assert
        expect(component.form).toBeDefined();
      });

  });

  describe('El metodo onClickConsultarMuestras', () => {

    it('Invoca al metodo Open de modalDetalleMuestras cuando se selecciona un row', () => {
      // Arrange
      component.selectedRow = [{}];
      spyOn(component.modalDetalleMuestras, 'open').and.returnValue('');
      // Act
      component.onClickConsultarMuestras();
      // Assert
      expect(component.modalDetalleMuestras.open).toHaveBeenCalledTimes(1);
    });

    it('Invoca al popupService error cuando se selecciona mas de un row', () => {
      // Arrange
      component.selectedRow = [{}, {}];
      spyOn(popupService , 'error');
      // Act
      component.onClickConsultarMuestras();
      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
      });
  });
});
