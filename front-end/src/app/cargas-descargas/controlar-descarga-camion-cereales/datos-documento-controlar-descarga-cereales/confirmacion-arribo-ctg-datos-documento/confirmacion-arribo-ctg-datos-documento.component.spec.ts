import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionArriboCtgDatosDocumentoComponent } from './confirmacion-arribo-ctg-datos-documento.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../../core/mocks/test.module';

describe('ConfirmacionArriboCtgDatosDocumentoComponent', () => {
  let component: ConfirmacionArriboCtgDatosDocumentoComponent;
  let fixture: ComponentFixture<ConfirmacionArriboCtgDatosDocumentoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionArriboCtgDatosDocumentoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionArriboCtgDatosDocumentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
