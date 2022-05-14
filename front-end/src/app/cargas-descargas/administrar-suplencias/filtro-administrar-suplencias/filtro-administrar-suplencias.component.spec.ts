import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarSuplenciasComponent } from './filtro-administrar-suplencias.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';

describe('FiltroAdministrarSuplenciasComponent', () => {
  let component: FiltroAdministrarSuplenciasComponent;
  let fixture: ComponentFixture<FiltroAdministrarSuplenciasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarSuplenciasComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TestModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarSuplenciasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
