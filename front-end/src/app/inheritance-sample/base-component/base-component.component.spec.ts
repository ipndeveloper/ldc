import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponentComponent } from './base-component.component';
import { configureTestSuite } from '../../core/mocks/testing';

describe('BaseComponentComponent', () => {
  let component: BaseComponentComponent;
  let fixture: ComponentFixture<BaseComponentComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseComponentComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
