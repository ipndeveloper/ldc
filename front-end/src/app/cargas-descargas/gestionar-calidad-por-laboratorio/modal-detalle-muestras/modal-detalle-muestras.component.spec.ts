import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleMuestrasComponent } from './modal-detalle-muestras.component';
import { TestModule } from '../../../core/mocks/test.module';
import { CoreSharedModule } from '../../../core/core-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { GestionarCalidadPorLaboratorioService } from '../service/gestionar-calidad-por-laboratorio.service';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('ModalDetalleMuestrasComponent', () => {
  let component: ModalDetalleMuestrasComponent;
  let fixture: ComponentFixture<ModalDetalleMuestrasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleMuestrasComponent ],
      imports: [
          TestModule,
          CoreSharedModule,
          ReactiveFormsModule,
          HotkeyModule.forRoot()
      ],
      providers: [ GestionarCalidadPorLaboratorioService ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleMuestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
