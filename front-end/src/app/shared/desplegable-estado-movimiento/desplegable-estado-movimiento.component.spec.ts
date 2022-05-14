import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../core/mocks/test.module';
import { DesplegableEstadoMovimientoComponent } from './desplegable-estado-movimiento.component';
import { EstadoMovimientoService } from './estado-movimiento.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('YrdDesplegableEstadoMovimientoComponent', () => {
  let component: DesplegableEstadoMovimientoComponent;
  let fixture: ComponentFixture<DesplegableEstadoMovimientoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableEstadoMovimientoComponent],
      imports: [TestModule],
      providers: [
        EstadoMovimientoService,
        DropdownNotificationService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableEstadoMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
