import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarRubroComponent } from './modal-agregar-rubro.component';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalAgregarRubroComponent', () => {
  let component: ModalAgregarRubroComponent;
  let fixture: ComponentFixture<ModalAgregarRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarRubroComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
