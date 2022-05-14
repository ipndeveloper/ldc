import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroAdministrarParametrosPorProductoComponent } from './filtro-administrar-parametros-por-producto.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroAdministrarParametrosPorProductoComponent', () => {
  let component: FiltroAdministrarParametrosPorProductoComponent;
  let fixture: ComponentFixture<FiltroAdministrarParametrosPorProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarParametrosPorProductoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarParametrosPorProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
