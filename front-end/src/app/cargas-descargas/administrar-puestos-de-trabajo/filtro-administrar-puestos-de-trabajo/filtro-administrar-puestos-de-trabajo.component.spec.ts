import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarPuestosDeTrabajoComponent } from './filtro-administrar-puestos-de-trabajo.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarPuestosDeTrabajoComponent', () => {
  let component: FiltroAdministrarPuestosDeTrabajoComponent;
  let fixture: ComponentFixture<FiltroAdministrarPuestosDeTrabajoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarPuestosDeTrabajoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarPuestosDeTrabajoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
