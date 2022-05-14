import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroAdministrarRangosCodigoBarraCamaraComponent } from './filtro-administrar-rangos-codigo-barra-camara.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroAdministrarRangosCodigoBarraCamaraComponent', () => {
  let component: FiltroAdministrarRangosCodigoBarraCamaraComponent;
  let fixture: ComponentFixture<FiltroAdministrarRangosCodigoBarraCamaraComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarRangosCodigoBarraCamaraComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarRangosCodigoBarraCamaraComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
