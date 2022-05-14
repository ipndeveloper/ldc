import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';

import { FiltroBusquedaReimpresionObleaLaboratorioComponent } from './filtro-busqueda-reimpresion-oblea-laboratorio.component';

describe('FiltroBusquedaReimpresionObleaLaboratorioComponent', () => {
  let component: FiltroBusquedaReimpresionObleaLaboratorioComponent;
  let fixture: ComponentFixture<FiltroBusquedaReimpresionObleaLaboratorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ FiltroBusquedaReimpresionObleaLaboratorioComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FormComponentService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaReimpresionObleaLaboratorioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
