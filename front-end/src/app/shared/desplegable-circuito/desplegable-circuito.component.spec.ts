import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableCircuitoComponent } from './desplegable-circuito.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';

describe('DesplegableCircuitoComponent', () => {
  let component: DesplegableCircuitoComponent;
  let fixture: ComponentFixture<DesplegableCircuitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
      ],
      declarations: [ DesplegableCircuitoComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
