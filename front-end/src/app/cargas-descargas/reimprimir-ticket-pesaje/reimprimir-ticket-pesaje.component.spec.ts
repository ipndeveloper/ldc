import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimprimirTicketPesajeComponent } from './reimprimir-ticket-pesaje.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchMovimientosReimpresionTicketPesajeService } from './services/search-movimientos-reimpresion-ticket-pesaje.service';
import { PatenteService } from '../shared/services/patente.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReimprimirTicketPesajeService } from './services/reimprimir-ticket-pesaje.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { DesplegableImpresorasPorUsuarioService } from '../../shared/desplegable-impresoras-por-usuario/desplegable-impresoras-por-usuario.service';
import { of } from 'rxjs';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { MisImpresorasService } from '../mis-impresoras/mis-impresoras.service';
import { ImpresoraDataView } from '../../shared/data-models/impresora-data-view';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

describe('ReimprimirTicketPesajeComponent', () => {
  let component: ReimprimirTicketPesajeComponent;
  let fixture: ComponentFixture<ReimprimirTicketPesajeComponent>;
  let misImpresorasService: MisImpresorasService;
  let fcService: FormComponentService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ReimprimirTicketPesajeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        SearchMovimientosReimpresionTicketPesajeService,
        PatenteService,
        SearchFormActionsNotifierService,
        ApiService,
        ReimprimirTicketPesajeService,
        DesplegableImpresorasPorUsuarioService,
        FormComponentService,
        MisImpresorasService,
        TipoDocumentoPorteService
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule,
        NgxDatatableModule
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimprimirTicketPesajeComponent);
    component = fixture.componentInstance;
    misImpresorasService = TestBed.get(MisImpresorasService);
    fcService = TestBed.get(FormComponentService);
    createForm();
  });

  function createForm() {
    const fb = new FormBuilder();
    component.reimprimirTicketPesajeForm = fb.group({
      filtros: fb.group({
        patente: { value: '', disabled: false },
        nroTicket: { value: '', disabled: false },
        tipoDocPorte: { value: '', disabled: false },
        nroDocPorte: { value: '', disabled: false },
        numeroVagon: { value: '', disabled: false }
      }),
      impresion: fb.group({
        impresora: { value: '', disabled: true },
      })
    });
    fcService.initialize(component.reimprimirTicketPesajeForm);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método ngAfterViewInit', () => {

    it('Invoca al método ObtenerPorDefecto de misImpresorasService', () => {
      // Arrange
      spyOn(misImpresorasService, 'ObtenerPorDefecto').and.returnValue(of({}));

      // Act
      component.ngAfterViewInit();

      // Assert
      expect(misImpresorasService.ObtenerPorDefecto).toHaveBeenCalledTimes(1);
    });


    it('Invoca al método setvalue del fcService para setear la impresora', () => {
      // Arrange
      const impresora = new ImpresoraDataView();
      spyOn(misImpresorasService, 'ObtenerPorDefecto').and.returnValue(of(impresora));
      spyOn(fcService, 'setValue');

      // Act
      component.ngAfterViewInit();

      // Assert
      expect(fcService.setValue).toHaveBeenCalledWith('impresion.impresora', impresora, {onlySelf: true});
    });

    it('No Invoca al método setvalue del fcService para setear la impresora cuando el servicio no devuelve una impresora', () => {
      // Arrange
      spyOn(misImpresorasService, 'ObtenerPorDefecto').and.returnValue(of());
      spyOn(fcService, 'setValue');

      // Act
      component.ngAfterViewInit();

      // Assert
      expect(fcService.setValue).toHaveBeenCalledTimes(0);
    });
  });

});
