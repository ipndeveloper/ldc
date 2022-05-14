import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarEquivalenciaRubrosComponent } from './filtro-administrar-equivalencia-rubros.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroAdministrarEquivalenciaRubrosComponent', () => {
  let component: FiltroAdministrarEquivalenciaRubrosComponent;
  let fixture: ComponentFixture<FiltroAdministrarEquivalenciaRubrosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarEquivalenciaRubrosComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarEquivalenciaRubrosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
