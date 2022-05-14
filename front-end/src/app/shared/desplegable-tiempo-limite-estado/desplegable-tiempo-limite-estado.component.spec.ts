import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableTiempoLimiteEstadoComponent } from './desplegable-tiempo-limite-estado.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { DesplegableTiempoLimiteEstadoService } from './desplegable-tiempo-limite-estado.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';

describe('DesplegableTiempoLimiteEstadoComponent', () => {
  let component: DesplegableTiempoLimiteEstadoComponent;
  let fixture: ComponentFixture<DesplegableTiempoLimiteEstadoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableTiempoLimiteEstadoComponent],
      imports: [TestModule],
      providers: [
        DesplegableTiempoLimiteEstadoService,
        DropdownNotificationService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTiempoLimiteEstadoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
