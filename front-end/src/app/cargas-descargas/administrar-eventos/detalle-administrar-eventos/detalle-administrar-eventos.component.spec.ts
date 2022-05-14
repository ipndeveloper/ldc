import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';

import { DetalleAdministrarEventosComponent } from './detalle-administrar-eventos.component';

describe('DetalleAdministrarEventosComponent', () => {
  let component: DetalleAdministrarEventosComponent;
  let fixture: ComponentFixture<DetalleAdministrarEventosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarEventosComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarEventosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
