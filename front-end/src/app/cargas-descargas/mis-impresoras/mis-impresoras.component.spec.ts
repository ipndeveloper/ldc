import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisImpresorasComponent } from './mis-impresoras.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MisImpresorasService } from './mis-impresoras.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('MisImpresorasComponent', () => {
  let component: MisImpresorasComponent;
  let fixture: ComponentFixture<MisImpresorasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MisImpresorasComponent ],
      imports: [
        TestModule,
        RouterModule,
        RouterTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [MisImpresorasService, FormComponentService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisImpresorasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
