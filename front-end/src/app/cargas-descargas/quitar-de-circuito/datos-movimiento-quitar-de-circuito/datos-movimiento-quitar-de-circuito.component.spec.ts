import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { FocusDirective } from '../../../core/directives/focus/focus.directive';
import { DatosMovimientoQuitarDeCircuitoComponent } from './datos-movimiento-quitar-de-circuito.component';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DatosMovimientoQuitarDeCircuitoComponent', () => {
  let component: DatosMovimientoQuitarDeCircuitoComponent;
  let fixture: ComponentFixture<DatosMovimientoQuitarDeCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosMovimientoQuitarDeCircuitoComponent,
        TextoConEtiquetaComponent,
        FocusDirective
      ],
      imports: [
        TestModule,
        ReactiveFormsModule
      ],
      providers: [
        FormComponentService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMovimientoQuitarDeCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
