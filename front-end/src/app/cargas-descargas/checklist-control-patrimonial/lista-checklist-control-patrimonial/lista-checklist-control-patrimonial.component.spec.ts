import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaChecklistControlPatrimonialComponent } from './lista-checklist-control-patrimonial.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListaChecklistControlPatrimonialComponent', () => {
  let component: ListaChecklistControlPatrimonialComponent;
  let fixture: ComponentFixture<ListaChecklistControlPatrimonialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaChecklistControlPatrimonialComponent ],
      imports: [ TestModule, ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaChecklistControlPatrimonialComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
