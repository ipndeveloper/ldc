import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarAutorizacionesBalanzaComponent } from './detalle-administrar-autorizaciones-balanza.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarAutorizacionesBalanzaComponent', () => {
  let component: DetalleAdministrarAutorizacionesBalanzaComponent;
  let fixture: ComponentFixture<DetalleAdministrarAutorizacionesBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarAutorizacionesBalanzaComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarAutorizacionesBalanzaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
