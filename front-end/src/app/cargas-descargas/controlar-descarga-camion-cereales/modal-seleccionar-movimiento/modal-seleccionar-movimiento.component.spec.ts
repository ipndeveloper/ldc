import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeleccionarMovimientoComponent } from './modal-seleccionar-movimiento.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalSeleccionarMovimientoComponent', () => {
  let component: ModalSeleccionarMovimientoComponent;
  let fixture: ComponentFixture<ModalSeleccionarMovimientoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSeleccionarMovimientoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSeleccionarMovimientoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
