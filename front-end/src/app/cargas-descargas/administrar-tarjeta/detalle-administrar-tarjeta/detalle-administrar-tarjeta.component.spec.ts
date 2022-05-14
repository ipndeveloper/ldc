import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarTarjetaComponent } from './detalle-administrar-tarjeta.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarTarjetaComponent', () => {
  let component: DetalleAdministrarTarjetaComponent;
  let fixture: ComponentFixture<DetalleAdministrarTarjetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdministrarTarjetaComponent],
      imports: [TestModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarTarjetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
