import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmarConObservacionesComponent } from './modal-confirmar-con-observaciones.component';
import { TestModule } from '../../../../core/mocks/test.module';
import { CoreSharedModule } from '../../../../core/core-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('ModalConfirmarConObservacionesComponent', () => {
  let component: ModalConfirmarConObservacionesComponent;
  let fixture: ComponentFixture<ModalConfirmarConObservacionesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfirmarConObservacionesComponent ],
      imports: [
        TestModule,
        CoreSharedModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot()
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmarConObservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
