import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableActividadComponent } from './desplegable-actividad.component';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesplegableActividadComponent', () => {
  let component: DesplegableActividadComponent;
  let fixture: ComponentFixture<DesplegableActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
      ],
      declarations: [ DesplegableActividadComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableActividadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
