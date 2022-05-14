import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAdministrarRangosCodigoBarraCamaraComponent } from './detalle-administrar-rangos-codigo-barra-camara.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarRangosCodigoBarraCamaraComponent', () => {
  let component: DetalleAdministrarRangosCodigoBarraCamaraComponent;
  let fixture: ComponentFixture<DetalleAdministrarRangosCodigoBarraCamaraComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarRangosCodigoBarraCamaraComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarRangosCodigoBarraCamaraComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
