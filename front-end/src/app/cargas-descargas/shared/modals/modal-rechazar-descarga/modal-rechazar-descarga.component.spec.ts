import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRechazarDescargaComponent } from './modal-rechazar-descarga.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreSharedModule } from '../../../../core/core-shared.module';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { TestModule } from '../../../../core/mocks/test.module';
import { RechazarDescargaService } from './rechazar-descarga.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('ModalRechazarDescargaComponent', () => {
  let component: ModalRechazarDescargaComponent;
  let fixture: ComponentFixture<ModalRechazarDescargaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRechazarDescargaComponent ],
      imports: [
        CoreSharedModule,
        ReactiveFormsModule,
        TestModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        FormComponentService,
        RechazarDescargaService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRechazarDescargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
