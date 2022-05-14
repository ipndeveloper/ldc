import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupoDatosDocumentoComponent } from './cupo-datos-documento.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CupoDatosDocumentoComponent', () => {
  let component: CupoDatosDocumentoComponent;
  let fixture: ComponentFixture<CupoDatosDocumentoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ CupoDatosDocumentoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupoDatosDocumentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
