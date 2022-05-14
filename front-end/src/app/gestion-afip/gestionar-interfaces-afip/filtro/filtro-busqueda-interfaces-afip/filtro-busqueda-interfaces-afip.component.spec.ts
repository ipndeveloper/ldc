import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBusquedaInterfacesAfipComponent } from './filtro-busqueda-interfaces-afip.component';
import { TestModule } from '../../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DesplegableServicioAfipComponent } from '../desplegable-servicio-afip/desplegable-servicio-afip.component';
import { ServicioAfipService } from '../servicio-afip.service';
import { FechaConEtiquetaComponent } from '../../../../core/controls/fecha-con-etiqueta/fecha-con-etiqueta.component';
import { FocusDirective } from '../../../../core/directives/focus/focus.directive';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroBusquedaInterfacesAfipComponent', () => {
  let component: FiltroBusquedaInterfacesAfipComponent;
  let fixture: ComponentFixture<FiltroBusquedaInterfacesAfipComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroBusquedaInterfacesAfipComponent,
        DesplegableServicioAfipComponent,
        FechaConEtiquetaComponent,
        FocusDirective
      ],
      imports: [
        TestModule,
        ReactiveFormsModule
      ],
      providers: [ServicioAfipService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaInterfacesAfipComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
