import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlSobreTransporteComponent } from './agregar-al-sobre-transporte.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';
import { AgregarAlSobreTransporteService } from './agregar-al-sobre-transporte.service';
import { PopupService } from '../../../core/services/popupService/popup.service';

describe('AgregarAlSobreTransporteComponent', () => {
  let component: AgregarAlSobreTransporteComponent;
  let fixture: ComponentFixture<AgregarAlSobreTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAlSobreTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AgregarAlSobreTransporteService,
        PopupService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlSobreTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
