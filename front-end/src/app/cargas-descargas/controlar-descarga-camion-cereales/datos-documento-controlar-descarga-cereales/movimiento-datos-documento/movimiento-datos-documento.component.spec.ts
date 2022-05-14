import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoDatosDocumentoComponent } from './movimiento-datos-documento.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../../core/mocks/test.module';

describe('MovimientoDatosDocumentoComponent', () => {
  let component: MovimientoDatosDocumentoComponent;
  let fixture: ComponentFixture<MovimientoDatosDocumentoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoDatosDocumentoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoDatosDocumentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
