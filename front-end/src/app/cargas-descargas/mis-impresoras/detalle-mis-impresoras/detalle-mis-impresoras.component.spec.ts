import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMisImpresorasComponent } from './detalle-mis-impresoras.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleMisImpresorasComponent', () => {
  let component: DetalleMisImpresorasComponent;
  let fixture: ComponentFixture<DetalleMisImpresorasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleMisImpresorasComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMisImpresorasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
