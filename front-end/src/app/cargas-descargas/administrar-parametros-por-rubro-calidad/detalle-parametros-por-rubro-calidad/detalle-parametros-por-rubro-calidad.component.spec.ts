import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleParametrosPorRubroCalidadComponent } from './detalle-parametros-por-rubro-calidad.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleParametrosPorRubroCalidadComponent', () => {
  let component: DetalleParametrosPorRubroCalidadComponent;
  let fixture: ComponentFixture<DetalleParametrosPorRubroCalidadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleParametrosPorRubroCalidadComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleParametrosPorRubroCalidadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
