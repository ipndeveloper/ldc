import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridComponent } from './data-grid.component';
import { TestModule } from '../../mocks/test.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../mocks/testing';

describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DataGridComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [TestModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
