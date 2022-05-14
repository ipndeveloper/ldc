import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCalidadPorLaboratorioComponent } from './filtro-calidad-por-laboratorio.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../../../core/components/modal/modal.module';
import { ProductoService } from '../../../shared/buscador-producto/producto.service';
import { PatenteService } from '../../shared/services/patente.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroCalidadPorLaboratorioComponent', () => {
  let component: FiltroCalidadPorLaboratorioComponent;
  let fixture: ComponentFixture<FiltroCalidadPorLaboratorioComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroCalidadPorLaboratorioComponent ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule,
        ModalModule
      ],
      providers : [
        ProductoService,
        PatenteService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCalidadPorLaboratorioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
