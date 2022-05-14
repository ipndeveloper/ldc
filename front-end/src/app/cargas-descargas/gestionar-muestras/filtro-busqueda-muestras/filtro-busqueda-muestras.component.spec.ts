import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBusquedaMuestrasComponent } from './filtro-busqueda-muestras.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroBusquedaMuestrasComponent', () => {
  let component: FiltroBusquedaMuestrasComponent;
  let fixture: ComponentFixture<FiltroBusquedaMuestrasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroBusquedaMuestrasComponent,
       ],
      imports: [
        ReactiveFormsModule,
        TestModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaMuestrasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
