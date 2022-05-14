import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosChecklistControlPatrimonialComponent } from './datos-checklist-control-patrimonial.component';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosChecklistControlPatrimonialComponent', () => {
  let component: DatosChecklistControlPatrimonialComponent;
  let fixture: ComponentFixture<DatosChecklistControlPatrimonialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosChecklistControlPatrimonialComponent ],
      imports: [ TestModule, ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosChecklistControlPatrimonialComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
