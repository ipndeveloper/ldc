import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTrabajoGeneracionArchivoMuestrasComponent } from './desplegable-trabajo-generacion-archivo-muestras.component';
import { EstadoTrabajoGeneracionArchivoMuestrasService } from './estado-trabajo-generacion-archivo-muestras.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableTrabajoGeneracionArchivoMuestrasComponent', () => {
  let component: DesplegableTrabajoGeneracionArchivoMuestrasComponent;
  let fixture: ComponentFixture<DesplegableTrabajoGeneracionArchivoMuestrasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableTrabajoGeneracionArchivoMuestrasComponent ],
      providers: [
        EstadoTrabajoGeneracionArchivoMuestrasService,
        ApiService,
        DropdownNotificationService
      ],
      imports: [
        TestModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTrabajoGeneracionArchivoMuestrasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
