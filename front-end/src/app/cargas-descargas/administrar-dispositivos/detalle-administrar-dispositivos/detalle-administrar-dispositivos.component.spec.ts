import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarDispositivosComponent } from './detalle-administrar-dispositivos.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarDispositivosComponent', () => {
  let component: DetalleAdministrarDispositivosComponent;
  let fixture: ComponentFixture<DetalleAdministrarDispositivosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarDispositivosComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarDispositivosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
