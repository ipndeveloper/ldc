import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmacionManualComponent } from './modal-confirmacion-manual.component';
import { TestModule } from '../../../core/mocks/test.module';
import { CoreSharedModule } from '../../../core/core-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { GestionarInterfacesAfipService } from '../services/gestionar-interfaces-afip.service';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('ModalConfirmacionManualComponent', () => {
  let component: ModalConfirmacionManualComponent;
  let fixture: ComponentFixture<ModalConfirmacionManualComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfirmacionManualComponent ],
      imports: [
        CoreSharedModule,
        ReactiveFormsModule,
        TestModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        GestionarInterfacesAfipService,
        FormComponentService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmacionManualComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
