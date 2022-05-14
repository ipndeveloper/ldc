import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSituacionBalanzaComponent } from './modal-situacion-balanza.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ModalSituacionBalanzaComponent', () => {
  let component: ModalSituacionBalanzaComponent;
  let fixture: ComponentFixture<ModalSituacionBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSituacionBalanzaComponent],
      imports: [
        NgbModule,
        PopupModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSituacionBalanzaComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
