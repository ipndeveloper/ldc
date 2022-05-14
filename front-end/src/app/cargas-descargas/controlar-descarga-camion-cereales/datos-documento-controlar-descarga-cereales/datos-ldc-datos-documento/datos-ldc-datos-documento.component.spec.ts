import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosLdcDatosDocumentoComponent } from './datos-ldc-datos-documento.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosLdcDatosDocumentoComponent', () => {
  let component: DatosLdcDatosDocumentoComponent;
  let fixture: ComponentFixture<DatosLdcDatosDocumentoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosLdcDatosDocumentoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosLdcDatosDocumentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
