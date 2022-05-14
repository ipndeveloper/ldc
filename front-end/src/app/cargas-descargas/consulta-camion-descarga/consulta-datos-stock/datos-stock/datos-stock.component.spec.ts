import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosStockComponent } from './datos-stock.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TestModule } from '../../../../core/mocks/test.module';
import { Movimiento } from '../../../../../app/shared/data-models/movimiento';
import { MovimientoPesaje } from '../../../../../app/cargas-descargas/registrar-peso/movimiento-pesaje';
import { Circuito } from '../../../../../app/shared/data-models/circuito/circuito';
import { EstadoMovimiento } from '../../../../../app/shared/data-models/estado-movimiento';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('DatosStockComponent', () => {
  let component: DatosStockComponent;
  let fixture: ComponentFixture<DatosStockComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosStockComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule,
        NgxDatatableModule,
        TestModule
      ],
      providers : [],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosStockComponent);
    component = fixture.componentInstance;
    const fb = fixture.debugElement.injector.get(FormBuilder);
    component.datosStockForm = fb.group({
      netoDescarga: '',
      coeficiente: '',
      netoDescargaLitros: '',
      destino: '',
      nroTicketPesaje: '',
      fechaStockSan: '',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El Metodo ngOnChanges', () => {

    let movimiento: Movimiento;
    let movimientoPesaje: MovimientoPesaje;

    beforeEach(() => {
      movimiento = new Movimiento(new Circuito(), new EstadoMovimiento(1));
      movimientoPesaje = new MovimientoPesaje(1);
    });

    it('llama al patchValue de su form para setear el total descargado cuando posee neto balanza y total descargas', () => {
      spyOn(component.datosStockForm, 'patchValue');

      component.netoBalanza = 100;
      component.totalMermas = 20;

      component.ngOnChanges();

      expect(component.datosStockForm.patchValue).toHaveBeenCalledWith({netoDescarga: 80});
    });

    it('no llama al patchValue de su form para setear el total descargado cuando no posee totalMermas', () => {
      spyOn(component.datosStockForm, 'patchValue');

      component.netoBalanza = 100;

      component.ngOnChanges();

      expect(component.datosStockForm.patchValue).toHaveBeenCalledTimes(0);
    });

    it('no llama al patchValue de su form para setear el total descargado cuando no posee netoBalanza', () => {
      spyOn(component.datosStockForm, 'patchValue');

      component.totalMermas = 100;

      component.ngOnChanges();

      expect(component.datosStockForm.patchValue).toHaveBeenCalledTimes(0);
    });

    it('llama al patchValue de su form para setear el fechaStockSan', () => {
      spyOn(component.datosStockForm, 'patchValue');
      movimiento.fechaStockSan = new Date().toLocalISOString();
      component.movimiento = movimiento;

      component.ngOnChanges();

      expect(component.datosStockForm.patchValue).toHaveBeenCalledWith({fechaStockSan: movimiento.fechaStockSan});
    });

    it('llama al patchValue de su form para setear el nroTicketPesaje', () => {
      spyOn(component.datosStockForm, 'patchValue');
      movimiento.nroTicketPesaje = 1234;
      component.movimiento = movimiento;

      component.ngOnChanges();

      expect(component.datosStockForm.patchValue).toHaveBeenCalledWith({nroTicketPesaje: movimiento.nroTicketPesaje});
    });

    it('no llama al patchValue de su form no tiene movimiento', () => {
      spyOn(component.datosStockForm, 'patchValue');

      component.ngOnChanges();

      expect(component.datosStockForm.patchValue).toHaveBeenCalledTimes(0);
    });

    it('llama al patchValue de su form para setear el destino', () => {
      spyOn(component.datosStockForm, 'patchValue');
      movimientoPesaje.lugarDescargaCarga = 'Lugar1';
      component.movimientoPesaje = movimientoPesaje;

      component.ngOnChanges();

      expect(component.datosStockForm.patchValue).toHaveBeenCalledWith({destino: movimientoPesaje.lugarDescargaCarga});
    });

    it('no llama al patchValue de su form no tiene movimientoPesaje', () => {
      spyOn(component.datosStockForm, 'patchValue');

      component.ngOnChanges();

      expect(component.datosStockForm.patchValue).toHaveBeenCalledTimes(0);
    });

  });
});
