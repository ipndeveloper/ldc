import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../../core/mocks/testing';
import { DetalleAdministrarTextoGmpComponent } from './detalle-administrar-texto-gmp.component';

describe('DetalleAdministrarTextoGmpComponent', () => {
  let component: DetalleAdministrarTextoGmpComponent;
  let fixture: ComponentFixture<DetalleAdministrarTextoGmpComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdministrarTextoGmpComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarTextoGmpComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
