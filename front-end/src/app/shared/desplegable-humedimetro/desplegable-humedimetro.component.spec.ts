import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableHumedimetroComponent } from './desplegable-humedimetro.component';
import { FinalidadService } from '../desplegable-finalidad/finalidad.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableHumedimetroComponent', () => {
  let component: DesplegableHumedimetroComponent;
  let fixture: ComponentFixture<DesplegableHumedimetroComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableHumedimetroComponent ],
      imports: [TestModule],
      providers: [FinalidadService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableHumedimetroComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
