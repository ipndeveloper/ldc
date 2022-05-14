import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableEstadoSobreTransporteComponent } from './desplegable-estado-sobre-transporte.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DesplegableEstadoSobreTransporteService } from './desplegable-estado-sobre-transporte.service';

describe('DesplegableEstadoSobreTransporteComponent', () => {
  let component: DesplegableEstadoSobreTransporteComponent;
  let fixture: ComponentFixture<DesplegableEstadoSobreTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableEstadoSobreTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [DesplegableEstadoSobreTransporteService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableEstadoSobreTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
