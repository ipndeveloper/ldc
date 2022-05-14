import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleComponent } from './modal-detalle.component';
import { CoreSharedModule } from '../../core-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TestModule } from '../../mocks/test.module';
import { HotkeyModule } from 'angular2-hotkeys';
import { configureTestSuite } from '../../mocks/testing';

describe('ModalDetalleComponent', () => {
  let component: ModalDetalleComponent;
  let fixture: ComponentFixture<ModalDetalleComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreSharedModule,
        ReactiveFormsModule,
        TestModule,
        HotkeyModule.forRoot()
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
