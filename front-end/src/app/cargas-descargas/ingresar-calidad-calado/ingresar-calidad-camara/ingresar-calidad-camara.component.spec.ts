import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarCalidadCamaraComponent } from './ingresar-calidad-camara.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GrupoRubroAnalisisService } from '../../../shared/desplegable-grupo-rubro-analisis/grupo-rubro-analisis.service';
import { DropdownNotificationService } from '../../../core/shared/super/dropdown-notification.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('IngresarCalidadCamaraComponent', () => {
  let component: IngresarCalidadCamaraComponent;
  let fixture: ComponentFixture<IngresarCalidadCamaraComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        IngresarCalidadCamaraComponent,
       ],
      imports: [
        TestModule,
        ReactiveFormsModule
      ],
      providers: [
        GrupoRubroAnalisisService,
        DropdownNotificationService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarCalidadCamaraComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
