import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusquedaMovimientoQuitarDeCircuitoComponent } from './busqueda-movimiento-quitar-de-circuito.component';
import { QuitarDeCircuitoService } from '../quitar-de-circuito.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('BusquedaMovimientoQuitarDeCircuitoComponent', () => {
  let component: BusquedaMovimientoQuitarDeCircuitoComponent;
  let fixture: ComponentFixture<BusquedaMovimientoQuitarDeCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusquedaMovimientoQuitarDeCircuitoComponent,
       ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        NgbModule
      ],
      providers: [
        QuitarDeCircuitoService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaMovimientoQuitarDeCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
