import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroMisImpresorasComponent } from './filtro-mis-impresoras.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroMisImpresorasComponent', () => {
  let component: FiltroMisImpresorasComponent;
  let fixture: ComponentFixture<FiltroMisImpresorasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroMisImpresorasComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroMisImpresorasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
