import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../../core/mocks/testing';
import { DatosTurnoCircularComponent } from './datos-turno-circular.component';

describe('DatosTurnoCircularComponent', () => {
  let component: DatosTurnoCircularComponent;
  let fixture: ComponentFixture<DatosTurnoCircularComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DatosTurnoCircularComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosTurnoCircularComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
