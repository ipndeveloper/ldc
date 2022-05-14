import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarSuplenciasComponent } from './detalle-administrar-suplencias.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';

describe('DetalleAdministrarSuplenciasComponent', () => {
  let component: DetalleAdministrarSuplenciasComponent;
  let fixture: ComponentFixture<DetalleAdministrarSuplenciasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarSuplenciasComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TestModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarSuplenciasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
