import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../../core/mocks/testing';
import { DatosDocumentoInsumosComponent } from './datos-documento-insumos.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';

describe('DatosDocumentoInsumosComponent', () => {
  let component: DatosDocumentoInsumosComponent;
  let fixture: ComponentFixture<DatosDocumentoInsumosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDocumentoInsumosComponent ],
      imports: [ TestModule ],
      providers: [
        FormComponentService,
        DescargaEventsNotifierService,
        ParametrosTerminalService,
        FinalidadService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDocumentoInsumosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
