import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableRubroCalidadComponent } from './desplegable-rubro-calidad.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesplegableRubroCalidadComponent', () => {
  let component: DesplegableRubroCalidadComponent;
  let fixture: ComponentFixture<DesplegableRubroCalidadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableRubroCalidadComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableRubroCalidadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
