import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionesDatosDocumentoComponent } from './observaciones-datos-documento.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ObservacionesDatosDocumentoComponent', () => {
  let component: ObservacionesDatosDocumentoComponent;
  let fixture: ComponentFixture<ObservacionesDatosDocumentoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacionesDatosDocumentoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionesDatosDocumentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
