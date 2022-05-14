import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLecturaTarjetaComponent } from './modal-lectura-tarjeta.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalLecturaTarjetaComponent', () => {
  let component: ModalLecturaTarjetaComponent;
  let fixture: ComponentFixture<ModalLecturaTarjetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLecturaTarjetaComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLecturaTarjetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
