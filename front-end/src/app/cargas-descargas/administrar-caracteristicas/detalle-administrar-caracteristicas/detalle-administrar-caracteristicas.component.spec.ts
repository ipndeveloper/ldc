import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarCaracteristicasComponent } from './detalle-administrar-caracteristicas.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { TestModule } from '../../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';

describe('DetalleAdministrarCaracteristicasComponent', () => {
  let component: DetalleAdministrarCaracteristicasComponent;
  let fixture: ComponentFixture<DetalleAdministrarCaracteristicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      declarations: [ DetalleAdministrarCaracteristicasComponent ],
      providers: [ApiService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarCaracteristicasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
