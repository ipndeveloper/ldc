import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableEstadoMuestraComponent } from './desplegable-estado-muestra.component';
import { EstadoMuestraService } from './estado-muestra.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableEstadoMuestraComponent', () => {
  let component: DesplegableEstadoMuestraComponent;
  let fixture: ComponentFixture<DesplegableEstadoMuestraComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableEstadoMuestraComponent ],
      providers: [
        EstadoMuestraService,
        ApiService,
        DropdownNotificationService
      ],
      imports: [
        TestModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableEstadoMuestraComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
