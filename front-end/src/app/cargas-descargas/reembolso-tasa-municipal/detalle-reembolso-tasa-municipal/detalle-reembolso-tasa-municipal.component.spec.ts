import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleReembolsoTasaMunicipalComponent } from './detalle-reembolso-tasa-municipal.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { AuthService } from '../../../core/services/session/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleReembolsoTasaMunicipalComponent', () => {
  let component: DetalleReembolsoTasaMunicipalComponent;
  let fixture: ComponentFixture<DetalleReembolsoTasaMunicipalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleReembolsoTasaMunicipalComponent],
      imports: [PopupModule],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReembolsoTasaMunicipalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
