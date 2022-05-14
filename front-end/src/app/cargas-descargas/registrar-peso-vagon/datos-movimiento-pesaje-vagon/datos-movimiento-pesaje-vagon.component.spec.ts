import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMovimientoPesajeVagonComponent } from './datos-movimiento-pesaje-vagon.component';
import { TestModule } from '../../../core/mocks/test.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { FocusDirective } from '../../../core/directives/focus/focus.directive';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DatosMovimientoPesajeVagonComponent', () => {
  let component: DatosMovimientoPesajeVagonComponent;
  let fixture: ComponentFixture<DatosMovimientoPesajeVagonComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosMovimientoPesajeVagonComponent,
        TextoConEtiquetaComponent,
        FocusDirective
      ],
      imports: [
        TestModule,
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMovimientoPesajeVagonComponent);
    component = fixture.componentInstance;

    component.datosMovimientoForm = formBuilder.group({
      tipoDocumentoPorte: null,
      nroDocumentoPorte: null,
      ctg: null,
      producto: null,
      entregador: null,
      estado: null,
      humedad: null,
      proteina: null,
      grado: null
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
