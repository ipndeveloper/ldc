import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';

import { DesplegableEventoComponent } from './desplegable-evento.component';
import { DesplegableEventoService } from './desplegable-evento.service';

describe('DesplegableEventoComponent', () => {
  let component: DesplegableEventoComponent;
  let fixture: ComponentFixture<DesplegableEventoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableEventoComponent],
      imports: [TestModule],
      providers: [
        DesplegableEventoService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableEventoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
