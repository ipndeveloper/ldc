import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalChecklistControlPatrimonialComponent } from './modal-checklist-control-patrimonial.component';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalChecklistControlPatrimonialComponent', () => {
  let component: ModalChecklistControlPatrimonialComponent;
  let fixture: ComponentFixture<ModalChecklistControlPatrimonialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalChecklistControlPatrimonialComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChecklistControlPatrimonialComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
