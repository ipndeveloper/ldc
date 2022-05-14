import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegablePuestoTrabajoComponent } from './desplegable-puesto-trabajo.component';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';

describe('DesplegablePuestoTrabajoComponent', () => {
  let component: DesplegablePuestoTrabajoComponent;
  let fixture: ComponentFixture<DesplegablePuestoTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegablePuestoTrabajoComponent ],
      imports: [TestModule],
      providers: [ApiService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegablePuestoTrabajoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
