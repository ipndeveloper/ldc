import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturaTarjetaComponent } from './lectura-tarjeta.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LecturaTarjetaService } from '../services/lectura-tarjeta.service';

describe('LecturaTarjetaComponent', () => {
  let component: LecturaTarjetaComponent;
  let fixture: ComponentFixture<LecturaTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturaTarjetaComponent ],
      imports: [TestModule],
      providers: [LecturaTarjetaService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturaTarjetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
