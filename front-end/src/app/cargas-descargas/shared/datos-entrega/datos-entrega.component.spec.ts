import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEntregaComponent } from './datos-entrega.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosEntregaComponent', () => {
  let component: DatosEntregaComponent;
  let fixture: ComponentFixture<DatosEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosEntregaComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEntregaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
