import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TestModule } from '../../core/mocks/test.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HotkeyModule } from 'angular2-hotkeys';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { SearchTrabajosArchivosMuestraService } from './services/search-trabajos-archivos-muestra.service';
import { GestionarTrabajosArchivosMuestraService } from './services/gestionar-trabajos-archivos-muestra.service';
import { GestionarTrabajosArchivosMuestraComponent } from './gestionar-trabajos-archivos-muestra.component';
import { EstadoTrabajoGeneracionArchivoMuestrasService } from '../../shared/desplegable-trabajo-generacion-archivo-muestras/estado-trabajo-generacion-archivo-muestras.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FileService } from '../../core/services/file/file.service';
import { ParametrosTerminalService } from '../shared/services/parametros-terminal.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';

describe('GestionarTrabajosArchivosMuestraComponent', () => {
  let component: GestionarTrabajosArchivosMuestraComponent;
  let fixture: ComponentFixture<GestionarTrabajosArchivosMuestraComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionarTrabajosArchivosMuestraComponent
      ],
      imports: [
        ReactiveFormsModule,
        TestModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        SearchTrabajosArchivosMuestraService,
        SearchFormActionsNotifierService,
        EstadoTrabajoGeneracionArchivoMuestrasService,
        GestionarTrabajosArchivosMuestraService,
        DropdownNotificationService,
        ExcelService,
        FileService,
        ParametrosTerminalService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarTrabajosArchivosMuestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
