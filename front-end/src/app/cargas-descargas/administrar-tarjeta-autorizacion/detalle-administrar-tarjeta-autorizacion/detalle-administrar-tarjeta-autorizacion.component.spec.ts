import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAdministrarTarjetaAutorizacionComponent } from './detalle-administrar-tarjeta-autorizacion.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarTarjetaAutorizacionComponent', () => {
  let component: DetalleAdministrarTarjetaAutorizacionComponent;
  let fixture: ComponentFixture<DetalleAdministrarTarjetaAutorizacionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdministrarTarjetaAutorizacionComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarTarjetaAutorizacionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
