import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarEquivalenciaRubrosComponent } from './detalle-administrar-equivalencia-rubros.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DetalleAdministrarEquivalenciaRubrosComponent', () => {
  let component: DetalleAdministrarEquivalenciaRubrosComponent;
  let fixture: ComponentFixture<DetalleAdministrarEquivalenciaRubrosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarEquivalenciaRubrosComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarEquivalenciaRubrosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
