import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GranosEspeciesDatosDocumentoComponent } from './granos-especies-datos-documento.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GranosEspeciesDatosDocumentoComponent', () => {
  let component: GranosEspeciesDatosDocumentoComponent;
  let fixture: ComponentFixture<GranosEspeciesDatosDocumentoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ GranosEspeciesDatosDocumentoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GranosEspeciesDatosDocumentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
