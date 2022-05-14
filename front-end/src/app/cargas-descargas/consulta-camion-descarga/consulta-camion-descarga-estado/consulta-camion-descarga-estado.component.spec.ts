import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCamionDescargaEstadoComponent } from './consulta-camion-descarga-estado.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { FocusDirective } from '../../../core/directives/focus/focus.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('ConsultaCamionDescargaEstadoComponent', () => {
  let component: ConsultaCamionDescargaEstadoComponent;
  let fixture: ComponentFixture<ConsultaCamionDescargaEstadoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConsultaCamionDescargaEstadoComponent,
        TextoConEtiquetaComponent,
        FocusDirective
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCamionDescargaEstadoComponent);
    component = fixture.componentInstance;
    component.estadoMovimientoForm = new FormGroup({});
    spyOn(component.estadoMovimientoForm, 'get').and.returnValue(new FormControl());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
