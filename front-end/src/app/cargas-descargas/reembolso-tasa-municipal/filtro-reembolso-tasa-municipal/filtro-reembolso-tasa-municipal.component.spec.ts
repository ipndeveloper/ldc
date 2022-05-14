import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroReembolsoTasaMunicipalComponent } from './filtro-reembolso-tasa-municipal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../../core/services/session/auth.service';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { configureTestSuite } from '../../../core/mocks/testing';


describe('FiltroReembolsoTasaMunicipalComponent', () => {
  let component: FiltroReembolsoTasaMunicipalComponent;
  let fixture: ComponentFixture<FiltroReembolsoTasaMunicipalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroReembolsoTasaMunicipalComponent],
      imports: [PopupModule],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroReembolsoTasaMunicipalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
