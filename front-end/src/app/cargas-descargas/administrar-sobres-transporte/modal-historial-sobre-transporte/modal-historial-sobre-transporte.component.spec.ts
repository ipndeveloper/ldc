import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialSobreTransporteComponent } from './modal-historial-sobre-transporte.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalHistorialSobreTransporteComponent', () => {
  let component: ModalHistorialSobreTransporteComponent;
  let fixture: ComponentFixture<ModalHistorialSobreTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHistorialSobreTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistorialSobreTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
