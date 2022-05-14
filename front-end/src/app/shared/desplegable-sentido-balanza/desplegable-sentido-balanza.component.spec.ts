import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableSentidoBalanzaComponent } from './desplegable-sentido-balanza.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { DesplegableSentidoBalanzaService } from './desplegable-sentido-balanza.service';

describe('DesplegableSentidoBalanzaComponent', () => {
  let component: DesplegableSentidoBalanzaComponent;
  let fixture: ComponentFixture<DesplegableSentidoBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableSentidoBalanzaComponent ],
      imports: [TestModule],
      providers: [DesplegableSentidoBalanzaService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableSentidoBalanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
