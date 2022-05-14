import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DerivedComponentComponent } from './derived-component.component';
import { BaseComponentComponent } from '../base-component/base-component.component';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DerivedComponentComponent', () => {
  let component: DerivedComponentComponent;
  let fixture: ComponentFixture<DerivedComponentComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DerivedComponentComponent, BaseComponentComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DerivedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
