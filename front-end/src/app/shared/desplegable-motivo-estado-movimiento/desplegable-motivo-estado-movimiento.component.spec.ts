import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableMotivoEstadoMovimientoComponent } from './desplegable-motivo-estado-movimiento.component';
import { TestModule } from '../../core/mocks/test.module';
import { MotivoEstadoMovimientoService } from './motivo-estado-movimiento.service';
import { TextAreaConEtiquetaComponent } from '../../core/controls/text-area-con-etiqueta/text-area-con-etiqueta.component';
import { FocusDirective } from '../../core/directives/focus/focus.directive';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableMotivoEstadoMovimientoComponent', () => {
  let component: DesplegableMotivoEstadoMovimientoComponent;
  let fixture: ComponentFixture<DesplegableMotivoEstadoMovimientoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DesplegableMotivoEstadoMovimientoComponent,
        TextAreaConEtiquetaComponent,
        FocusDirective
     ],
      imports: [
          TestModule
      ],
      providers: [
          MotivoEstadoMovimientoService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableMotivoEstadoMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
