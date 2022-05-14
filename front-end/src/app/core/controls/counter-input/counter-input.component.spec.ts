import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterInputComponent } from './counter-input.component';
import { configureTestSuite } from '../../mocks/testing';

describe('CounterInputComponent', () => {
  let component: CounterInputComponent;
  let fixture: ComponentFixture<CounterInputComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterInputComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
