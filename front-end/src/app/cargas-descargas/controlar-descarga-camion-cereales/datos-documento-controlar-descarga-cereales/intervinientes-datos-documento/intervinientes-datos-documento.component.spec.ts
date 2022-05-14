import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervinientesDatosDocumentoComponent } from './intervinientes-datos-documento.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('IntervinientesDatosDocumentoComponent', () => {
  let component: IntervinientesDatosDocumentoComponent;
  let fixture: ComponentFixture<IntervinientesDatosDocumentoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervinientesDatosDocumentoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervinientesDatosDocumentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
