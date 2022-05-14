import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTransporteDatosDocumentoComponent } from './datos-transporte-datos-documento.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ParametrosTerminalService } from '../../../shared/services/parametros-terminal.service';

describe('DatosTransporteDatosDocumentoComponent', () => {
  let component: DatosTransporteDatosDocumentoComponent;
  let fixture: ComponentFixture<DatosTransporteDatosDocumentoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosTransporteDatosDocumentoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ParametrosTerminalService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosTransporteDatosDocumentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
