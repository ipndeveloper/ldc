import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBusquedaMovimientosComponent } from './filtro-busqueda-movimientos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../../../core/components/modal/modal.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroBusquedaMovimientosComponent', () => {
  let component: FiltroBusquedaMovimientosComponent;
  let fixture: ComponentFixture<FiltroBusquedaMovimientosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroBusquedaMovimientosComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        TestModule,
        NgbModule,
        ModalModule,
        NgxDatatableModule,
        RouterModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaMovimientosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
