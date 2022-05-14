import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableCaracteristicaComponent } from './desplegable-caracteristica.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';

describe('DesplegableCaracteristicaComponent', () => {
  let component: DesplegableCaracteristicaComponent;
  let fixture: ComponentFixture<DesplegableCaracteristicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
      ],
      declarations: [ DesplegableCaracteristicaComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableCaracteristicaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
