import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAdministrarParametrosPorProductoComponent } from './detalle-administrar-parametros-por-producto.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarParametrosPorProductoComponent', () => {
  let component: DetalleAdministrarParametrosPorProductoComponent;
  let fixture: ComponentFixture<DetalleAdministrarParametrosPorProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarParametrosPorProductoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarParametrosPorProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
