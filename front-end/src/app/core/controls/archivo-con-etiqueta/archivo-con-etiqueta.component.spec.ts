import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivoConEtiquetaComponent } from './archivo-con-etiqueta.component';
import { configureTestSuite } from '../../mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopupModule } from '../../services/popupService/popup.module';

describe('ArchivoConEtiquetaComponent', () => {
  let component: ArchivoConEtiquetaComponent;
  let fixture: ComponentFixture<ArchivoConEtiquetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivoConEtiquetaComponent],
      imports: [PopupModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoConEtiquetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
