import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TesteoTarjetaComponent } from './testeo-tarjeta.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { LecturaTarjetaService } from '../shared/services/lectura-tarjeta.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TesteoTarjetaComponent', () => {
  let component: TesteoTarjetaComponent;
  let fixture: ComponentFixture<TesteoTarjetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [TesteoTarjetaComponent],
      imports: [TestModule],
      providers: [
        LecturaTarjetaService,
        FormBuilder,
        FormComponentService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteoTarjetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
