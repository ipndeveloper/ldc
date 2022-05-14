import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMotivoComponent } from './modal-motivo.component';
import { TestModule } from '../../../../core/mocks/test.module';
import { CoreSharedModule } from '../../../../core/core-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DesplegableMotivoEstadoMovimientoComponent } from '../../../../shared/desplegable-motivo-estado-movimiento/desplegable-motivo-estado-movimiento.component';
import { HotkeyModule } from 'angular2-hotkeys';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('ModalMotivoComponent', () => {
  let component: ModalMotivoComponent;
  let fixture: ComponentFixture<ModalMotivoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
          ModalMotivoComponent,
          DesplegableMotivoEstadoMovimientoComponent
        ],
      imports: [
          TestModule,
          CoreSharedModule,
          ReactiveFormsModule,
          HotkeyModule.forRoot()
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
