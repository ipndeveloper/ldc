import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSampleComponentComponent } from './page-sample-component.component';
import { BaseComponentComponent } from '../base-component/base-component.component';
import { DerivedComponentComponent } from '../derived-component/derived-component.component';
import { configureTestSuite } from '../../core/mocks/testing';

describe('PageSampleComponentComponent', () => {
  let component: PageSampleComponentComponent;
  let fixture: ComponentFixture<PageSampleComponentComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSampleComponentComponent, BaseComponentComponent, DerivedComponentComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSampleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
