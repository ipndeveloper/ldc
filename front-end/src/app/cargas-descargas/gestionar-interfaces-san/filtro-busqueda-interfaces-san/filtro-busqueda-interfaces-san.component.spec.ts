import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBusquedaInterfacesSanComponent } from './filtro-busqueda-interfaces-san.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroBusquedaInterfacesSanComponent', () => {
  let component: FiltroBusquedaInterfacesSanComponent;
  let fixture: ComponentFixture<FiltroBusquedaInterfacesSanComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [FiltroBusquedaInterfacesSanComponent],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaInterfacesSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
