import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroGestionarOrdenesCargaComponent } from './filtro-gestionar-ordenes-carga.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroGestionarOrdenesCargaComponent', () => {
  let component: FiltroGestionarOrdenesCargaComponent;
  let fixture: ComponentFixture<FiltroGestionarOrdenesCargaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroGestionarOrdenesCargaComponent,
      ],
      imports: [
        TestModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroGestionarOrdenesCargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
