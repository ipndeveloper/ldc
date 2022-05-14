import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTipoDocumentoPorteComponent } from './desplegable-tipo-documento-porte.component';
import { TipoDocumentoPorteService } from './tipo-documento-porte.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DesplegableTipoDocumentoPorteComponent', () => {
  let component: DesplegableTipoDocumentoPorteComponent;
  let fixture: ComponentFixture<DesplegableTipoDocumentoPorteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DesplegableTipoDocumentoPorteComponent,
      ],
      imports: [TestModule],
      providers : [
        TipoDocumentoPorteService,
        ApiService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoDocumentoPorteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
