import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBusquedaReimpresionDocumentoPorteComponent } from './filtro-busqueda-reimpresion-documento-porte.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { TipoDocumentoPorteService } from '../../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { NumeroConEtiquetaComponent } from '../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';

describe('FiltroBusquedaReimpresionDocumentoPorteComponent', () => {
  let component: FiltroBusquedaReimpresionDocumentoPorteComponent;
  let fixture: ComponentFixture<FiltroBusquedaReimpresionDocumentoPorteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ FiltroBusquedaReimpresionDocumentoPorteComponent, NumeroConEtiquetaComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FormComponentService, TipoDocumentoPorteService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaReimpresionDocumentoPorteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
