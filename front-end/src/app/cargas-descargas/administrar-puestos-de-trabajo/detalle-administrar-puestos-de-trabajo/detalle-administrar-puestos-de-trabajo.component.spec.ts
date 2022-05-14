import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarPuestosDeTrabajoComponent } from './detalle-administrar-puestos-de-trabajo.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('DetalleAdministrarPuestosDeTrabajoComponent', () => {
  let component: DetalleAdministrarPuestosDeTrabajoComponent;
  let fixture: ComponentFixture<DetalleAdministrarPuestosDeTrabajoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarPuestosDeTrabajoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FormBuilder]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarPuestosDeTrabajoComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
