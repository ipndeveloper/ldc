import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroAdministrarTarjetaAutorizacionComponent } from './filtro-administrar-tarjeta-autorizacion.component';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarTarjetaAutorizacionComponent', () => {
  let component: FiltroAdministrarTarjetaAutorizacionComponent;
  let fixture: ComponentFixture<FiltroAdministrarTarjetaAutorizacionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAdministrarTarjetaAutorizacionComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarTarjetaAutorizacionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
