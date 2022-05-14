import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleSobreTransporteComponent } from './detalle-sobre-transporte.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleSobreTransporteComponent', () => {
  let component: DetalleSobreTransporteComponent;
  let fixture: ComponentFixture<DetalleSobreTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSobreTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSobreTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
