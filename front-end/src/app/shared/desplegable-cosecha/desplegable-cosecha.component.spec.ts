import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableCosechaComponent } from './desplegable-cosecha.component';
import { CosechaService } from './cosecha.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ParametrosTerminalService } from '../../cargas-descargas/shared/services/parametros-terminal.service';

describe('DesplegableCosechaComponent', () => {
  let component: DesplegableCosechaComponent;
  let fixture: ComponentFixture<DesplegableCosechaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableCosechaComponent],
      imports: [TestModule],
      providers: [CosechaService, ParametrosTerminalService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableCosechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
