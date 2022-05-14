import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaEntidadTransportableComponent } from './consulta-entidad-transportable.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConsultaEntidadTransportableComponent', () => {
  let component: ConsultaEntidadTransportableComponent;
  let fixture: ComponentFixture<ConsultaEntidadTransportableComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaEntidadTransportableComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEntidadTransportableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
