import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableTipoSobreTransporteComponent } from './desplegable-tipo-sobre-transporte.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DesplegableTipoSobreTransporteService } from './desplegable-tipo-sobre-transporte.service';

describe('DesplegableTipoSobreTransporteComponent', () => {
  let component: DesplegableTipoSobreTransporteComponent;
  let fixture: ComponentFixture<DesplegableTipoSobreTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableTipoSobreTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [DesplegableTipoSobreTransporteService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoSobreTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
