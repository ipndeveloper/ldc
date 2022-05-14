import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FiltroRegistrarControlPatrimonialComponent } from './filtro-registrar-control-patrimonial.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../../core/services/session/auth.service';
import { PopupModule } from '../../../core/services/popupService/popup.module';

describe('FiltroRegistrarControlPatrimonialComponent', () => {
  let component: FiltroRegistrarControlPatrimonialComponent;
  let fixture: ComponentFixture<FiltroRegistrarControlPatrimonialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroRegistrarControlPatrimonialComponent],
      imports: [PopupModule],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroRegistrarControlPatrimonialComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngOnInit()', () => {
    it('invoca al metodo setFocus', () => {
      spyOn(component, 'setFocus');

      component.ngOnInit();

      expect(component.setFocus).toHaveBeenCalled();
    });
  });

  describe('El metodo setFocus()', () => {
    it('invoca al metodo setFocus del autocompletePatente', fakeAsync(() => {
      component.autocompletePatente.setFocus = jasmine.createSpy('setFocus');

      component.setFocus();
      tick(1);

      expect(component.autocompletePatente.setFocus).toHaveBeenCalled();
    }));
  });
});
