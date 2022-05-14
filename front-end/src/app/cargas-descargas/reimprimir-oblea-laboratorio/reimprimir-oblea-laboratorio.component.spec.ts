import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../core/mocks/test.module';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';

import { ReimprimirObleaLaboratorioComponent } from './reimprimir-oblea-laboratorio.component';
import { ReimprimirObleaLaboratorioService } from './reimprimir-oblea-laboratorio.service';

describe('ReimprimirObleaLaboratorioComponent', () => {
  let component: ReimprimirObleaLaboratorioComponent;
  let fixture: ComponentFixture<ReimprimirObleaLaboratorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ ReimprimirObleaLaboratorioComponent ],
      providers: [
        FormComponentService,
        ReimprimirObleaLaboratorioService,
        PopupService],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimprimirObleaLaboratorioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
