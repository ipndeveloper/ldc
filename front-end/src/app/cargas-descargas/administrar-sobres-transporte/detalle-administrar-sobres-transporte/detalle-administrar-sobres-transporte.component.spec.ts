import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarSobresTransporteComponent } from './detalle-administrar-sobres-transporte.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarSobresTransporteComponent', () => {
  let component: DetalleAdministrarSobresTransporteComponent;
  let fixture: ComponentFixture<DetalleAdministrarSobresTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarSobresTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarSobresTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
