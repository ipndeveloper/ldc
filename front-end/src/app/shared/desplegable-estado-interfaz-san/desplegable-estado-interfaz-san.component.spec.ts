import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableEstadoInterfazSanComponent } from './desplegable-estado-interfaz-san.component';
import { TestModule } from '../../core/mocks/test.module';
import { EstadoInterfazSanService } from './estado-interfaz-san.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableEstadoInterfazSanComponent', () => {
  let component: DesplegableEstadoInterfazSanComponent;
  let fixture: ComponentFixture<DesplegableEstadoInterfazSanComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ DesplegableEstadoInterfazSanComponent ],
      providers: [
        EstadoInterfazSanService,
        DropdownNotificationService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableEstadoInterfazSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
