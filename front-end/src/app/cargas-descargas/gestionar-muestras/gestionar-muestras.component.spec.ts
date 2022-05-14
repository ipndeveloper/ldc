import {  ComponentFixture, TestBed, inject, async } from '@angular/core/testing';

import { GestionarMuestrasComponent } from './gestionar-muestras.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestModule } from '../../core/mocks/test.module';
import { SearchFormTemplateComponent } from '../../core/components/search-form-template/search-form-template.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchMuestrasService } from './services/search-muestras.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { EstadoMuestraService } from '../../shared/desplegable-estado-muestra/estado-muestra.service';
import { GestionarMuestrasService } from './services/gestionar-muestras.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { of } from 'rxjs';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { EstadosMuestra } from '../../shared/enums/enums';
import { AutorizarMuestrasAgilService } from './services/autorizar-muestras-agil.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';

class EstadoMuestraServiceSpy {
  getAll = jasmine.createSpy('getAll').and.callFake(
    () => of([])
  );
}

class SearchMuestraServiceSpy {
  getData = jasmine.createSpy('getData').and.callFake(
    () => of([])
  );
}

describe('GestionarMuestrasComponent', () => {
  let component: GestionarMuestrasComponent;
  let fixture: ComponentFixture<GestionarMuestrasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionarMuestrasComponent,
        SearchFormTemplateComponent,
      ],
      imports: [
        ReactiveFormsModule,
        TestModule,
        NgxDatatableModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        SearchMuestrasService,
        SearchFormActionsNotifierService,
        EstadoMuestraService,
        GestionarMuestrasService,
        DropdownNotificationService,
        AutorizarMuestrasAgilService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(GestionarMuestrasComponent, {
        set: {
          providers: [
            { provide: EstadoMuestraService, useClass: EstadoMuestraServiceSpy },
            { provide: SearchFormService, useClass: SearchMuestraServiceSpy }
          ]
        }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarMuestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.filtroBusquedaMuestra.setFocus = jasmine.createSpy('setFocus');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El Método onClickDescartar', function () {

    it('Llama a popupService.error con el mensaje definido cuando se selecciona más de un registro de la grilla',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [{ id: 1 }, { id: 2 }];

          component.onClickDescartar();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Descartar);
        }));

    it('Llama a popupService.error con el mensaje definido cuando no se selecciona ningún registro de la grilla',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [];

          component.onClickDescartar();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Descartar);
        }));

    it(`Llama a popupService.confirm con el mensaje definido cuando se selecciona un único registro en la grilla y
    la muestra está en estado válido para descartar`,
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(false));
          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.PendienteAutorizacion }];

          component.onClickDescartar();

          expect(popupService.confirm).toHaveBeenCalledWith(Resources.Messages.LaMuestraSeraDescartada);
        }));

    it(`Llama a popupService.error con el mensaje definido cuando se selecciona un registro de la grilla
    con estado inválido para realizar la acción`,
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.AutorizadoEnvioCamara }];

          component.onClickDescartar();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.MuestraDebeEstarPendienteAutorizacionParaAccion,
            Resources.Labels.Descartar);
        }));

    it('Llama a descartar cuando se confirmó el popup', async(
      inject([PopupService, GestionarMuestrasService, SearchFormActionsNotifierService],
        (popupService: PopupService, gestionarMuestrasService: GestionarMuestrasService,
          notificationActionsService: SearchFormActionsNotifierService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(true));
          spyOn(gestionarMuestrasService, 'descartar').and.returnValue(of(''));
          spyOn(notificationActionsService, 'onRefreshGrid').and.callFake(function () { return; });
          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.PendienteAutorizacion }];

          component.onClickDescartar();

          popupService.confirm('').then(() => {
            expect(gestionarMuestrasService.descartar).toHaveBeenCalled();
          });
        })));

    it('No llama a descartar cuando no se confirmó el popup', async(
      inject([PopupService, GestionarMuestrasService],
        (popupService: PopupService, gestionarMuestrasService: GestionarMuestrasService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(false));
          spyOn(gestionarMuestrasService, 'descartar').and.returnValue(of(''));

          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.PendienteAutorizacion }];

          component.onClickDescartar();

          popupService.confirm('').then(() => {
            expect(gestionarMuestrasService.descartar).not.toHaveBeenCalled();
          });
        })));

    it('Llama a popupService.success con el mensaje definido luego de actualizar la muestra', async(
      inject([PopupService, GestionarMuestrasService, SearchFormActionsNotifierService],
        (popupService: PopupService, gestionarMuestrasService: GestionarMuestrasService,
          notificationActionsService: SearchFormActionsNotifierService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(true));
          spyOn(popupService, 'success');
          spyOn(gestionarMuestrasService, 'descartar').and.returnValue(of(''));
          spyOn(notificationActionsService, 'onRefreshGrid').and.callFake(function () { return; });

          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.PendienteAutorizacion }];

          component.onClickDescartar();

          popupService.confirm('').then(() => {
            expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.LaMuestraFueDescartada, Resources.Labels.Descartar);
          });
        })));
  });

  describe('El Método onClickAutorizar', function () {

    it('Llama a popupService.error con el mensaje definido cuando se selecciona más de un registro de la grilla',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [{ id: 1 }, { id: 2 }];

          component.onClickAutorizar();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Autorizar);
        }));

    it('Llama a popupService.error con el mensaje definido cuando no se selecciona ningún registro de la grilla',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [];

          component.onClickAutorizar();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Autorizar);
        }));

    it(`Llama a popupService.confirm con el mensaje definido cuando se selecciona un único registro en la grilla y
    la muestra está en estado válido para autorizar`,
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(false));
          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.PendienteAutorizacion }];

          component.onClickAutorizar();

          expect(popupService.confirm).toHaveBeenCalledWith(Resources.Messages.LaMuestraSeraAutorizada);
        }));

    it(`Llama a popupService.error con el mensaje definido cuando se selecciona un registro de la grilla
    con estado inválido para realizar la acción`,
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.AutorizadoEnvioCamara }];

          component.onClickAutorizar();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.MuestraDebeEstarPendienteAutorizacionParaAccion,
            Resources.Labels.Autorizar);
        }));

    it('Llama a autorizar cuando se confirmó el popup', async(
      inject([PopupService, GestionarMuestrasService, SearchFormActionsNotifierService],
        (popupService: PopupService, gestionarMuestrasService: GestionarMuestrasService,
          notificationActionsService: SearchFormActionsNotifierService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(true));
          spyOn(gestionarMuestrasService, 'autorizar').and.returnValue(of(''));
          spyOn(notificationActionsService, 'onRefreshGrid').and.callFake(function () { return; });
          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.PendienteAutorizacion }];

          component.onClickAutorizar();

          popupService.confirm('').then(() => {
            expect(gestionarMuestrasService.autorizar).toHaveBeenCalled();
          });
        })));

    it('No llama a autorizar cuando no se confirmó el popup', async(
      inject([PopupService, GestionarMuestrasService],
        (popupService: PopupService, gestionarMuestrasService: GestionarMuestrasService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(false));
          spyOn(gestionarMuestrasService, 'autorizar').and.returnValue(of(''));

          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.PendienteAutorizacion }];

          component.onClickAutorizar();

          popupService.confirm('').then(() => {
            expect(gestionarMuestrasService.autorizar).not.toHaveBeenCalled();
          });
        })));

    it('Llama a popupService.success con el mensaje definido luego de actualizar la muestra', async(
      inject([PopupService, GestionarMuestrasService, SearchFormActionsNotifierService],
        (popupService: PopupService, gestionarMuestrasService: GestionarMuestrasService,
          notificationActionsService: SearchFormActionsNotifierService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(true));
          spyOn(popupService, 'success');
          spyOn(gestionarMuestrasService, 'autorizar').and.returnValue(of(''));
          spyOn(notificationActionsService, 'onRefreshGrid').and.callFake(function () { return; });

          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.PendienteAutorizacion }];

          component.onClickAutorizar();

          popupService.confirm('').then(() => {
            expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.LaMuestraFueAutorizada, Resources.Labels.Autorizar);
          });
        })));
  });

  describe('El Método onClickReversarEstado', function () {

    it('Llama a popupService.error con el mensaje definido cuando se selecciona más de un registro de la grilla',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [{ id: 1 }, { id: 2 }];

          component.onClickReversarEstado();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro,
            Resources.Labels.ReversarEstadoMuestra);
        }));

    it('Llama a popupService.error con el mensaje definido cuando no se selecciona ningún registro de la grilla',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [];

          component.onClickReversarEstado();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro,
            Resources.Labels.ReversarEstadoMuestra);
        }));

    it(`Llama a popupService.confirm con el mensaje definido cuando se selecciona un único registro en la grilla y
    la muestra está en estado válido para reversar estado`,
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(false));
          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.Descartada }];

          component.onClickReversarEstado();

          expect(popupService.confirm).toHaveBeenCalledWith(Resources.Messages.LaMuestraSeraReversada);
        }));

    it(`Llama a popupService.error con el mensaje definido cuando se selecciona un registro de la grilla
    con estado inválido para realizar la acción`,
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.AutorizadoEnvioCamara }];

          component.onClickReversarEstado();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.MuestraDebeEstarDescartadaParaAccion,
            Resources.Labels.ReversarEstadoMuestra);
        }));

    it('Llama a reversarEstado cuando se confirmó el popup', async(
      inject([PopupService, GestionarMuestrasService, SearchFormActionsNotifierService],
        (popupService: PopupService, gestionarMuestrasService: GestionarMuestrasService,
          notificationActionsService: SearchFormActionsNotifierService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(true));
          spyOn(gestionarMuestrasService, 'reversarEstado').and.returnValue(of(''));
          spyOn(notificationActionsService, 'onRefreshGrid').and.callFake(function () { return; });
          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.Descartada }];

          component.onClickReversarEstado();

          popupService.confirm('').then(() => {
            expect(gestionarMuestrasService.reversarEstado).toHaveBeenCalled();
          });
        })));

    it('No llama a reversarEstado cuando no se confirmó el popup', async(
      inject([PopupService, GestionarMuestrasService],
        (popupService: PopupService, gestionarMuestrasService: GestionarMuestrasService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(false));
          spyOn(gestionarMuestrasService, 'reversarEstado').and.returnValue(of(''));

          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.Descartada }];

          component.onClickReversarEstado();

          popupService.confirm('').then(() => {
            expect(gestionarMuestrasService.reversarEstado).not.toHaveBeenCalled();
          });
        })));

    it('Llama a popupService.success con el mensaje definido luego de actualizar la muestra', async(
      inject([PopupService, GestionarMuestrasService, SearchFormActionsNotifierService],
        (popupService: PopupService, gestionarMuestrasService: GestionarMuestrasService,
          notificationActionsService: SearchFormActionsNotifierService) => {
          spyOn(popupService, 'confirm').and.returnValue(Promise.resolve(true));
          spyOn(popupService, 'success');
          spyOn(gestionarMuestrasService, 'reversarEstado').and.returnValue(of(''));
          spyOn(notificationActionsService, 'onRefreshGrid').and.callFake(function () { return; });

          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.Descartada }];

          component.onClickReversarEstado();

          popupService.confirm('').then(() => {
            expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.LaMuestraFueReversada,
              Resources.Labels.ReversarEstadoMuestra);
          });
        })));
  });

  describe('El Método onClickCambiarCodigoBarras', function () {
    it('Llama a popupService.error con el mensaje definido cuando se selecciona más de un registro de la grilla',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [{ id: 1 }, { id: 2 }];

          component.onClickCambiarCodigoBarras();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro,
            Resources.Labels.CambiarCodBarra);
        }));

    it('Llama a popupService.error con el mensaje definido cuando no se selecciona ningún registro de la grilla',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [];

          component.onClickCambiarCodigoBarras();

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro,
            Resources.Labels.CambiarCodBarra);
        }));

    it(`Llama a popupService.error con el mensaje definido cuando se selecciona un registro de la grilla
        con estado inválido para realizar la acción`,
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          component.selectedRow = [{ id: 1, idEstado: EstadosMuestra.Descartada }];

          component.onClickCambiarCodigoBarras();

          expect(popupService.error).toHaveBeenCalledWith(
            Resources.Messages.MuestraDebeEstarPendienteAutorizacionOAutorizadoEnvioParaAccion,
            Resources.Labels.CambiarCodBarra);
        }));
  });
});
