import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarCalidadObservacionesComponent } from './ingresar-calidad-observaciones.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DesplegableReferenciaDestinoComponent } from '../../../shared/desplegable-referencia-destino/desplegable-referencia-destino.component';
import { ReferenciaDestinoService } from '../../../shared/desplegable-referencia-destino/referencia-destino.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('IngresarCalidadObservacionesComponent', () => {
  let component: IngresarCalidadObservacionesComponent;
  let fixture: ComponentFixture<IngresarCalidadObservacionesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DesplegableReferenciaDestinoComponent,
        IngresarCalidadObservacionesComponent
       ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        TestModule,
        NgbModule
      ],
      providers: [
        ReferenciaDestinoService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarCalidadObservacionesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
