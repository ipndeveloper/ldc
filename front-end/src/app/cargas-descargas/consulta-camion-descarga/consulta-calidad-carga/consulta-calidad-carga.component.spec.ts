import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCalidadCargaComponent } from './consulta-calidad-carga.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('ConsultaCalidadCargaComponent', () => {
  let component: ConsultaCalidadCargaComponent;
  let fixture: ComponentFixture<ConsultaCalidadCargaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaCalidadCargaComponent ],
      imports: [TestModule],
      schemas: [ NO_ERRORS_SCHEMA],
      providers: [ FormComponentService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCalidadCargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
