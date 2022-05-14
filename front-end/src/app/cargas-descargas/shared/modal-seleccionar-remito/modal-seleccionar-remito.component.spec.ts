import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeleccionarRemitoComponent } from './modal-seleccionar-remito.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalSeleccionarRemitoComponent', () => {
  let component: ModalSeleccionarRemitoComponent;
  let fixture: ComponentFixture<ModalSeleccionarRemitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSeleccionarRemitoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSeleccionarRemitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
