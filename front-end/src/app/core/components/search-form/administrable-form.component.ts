import { SearchFormComponent } from './search-form.component';
import { SearchFormActionsNotifierService } from './services/search-form-actions-notifier.service';
import { PopupService } from '../../services/popupService/popup.service';
import { Dictionary } from '../../models/dictionary';
import { Observable, ReplaySubject } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { takeUntil, catchError } from 'rxjs/operators';
import { Collection } from '../../models/collection';
import { Resources } from '../../../../locale/artifacts/resources';
import { FormComponentService } from '../../services/formComponent/formComponent.service';
import { AdministrableFormService } from './services/administrable-form.service';

export abstract class AdministrableFormComponent<TOutput,
  TBaseCommand,
  TCreateCommand extends TBaseCommand,
  TUpdateCommand extends TBaseCommand,
  TDataView> extends SearchFormComponent<TOutput>
  implements OnInit, OnDestroy {

  protected onDestroy: ReplaySubject<boolean> = new ReplaySubject(1);
  editId: number;
  disableButtons = true;
  esConsulta = false;
  isLoading = false;
  esCopia = false;
  timeOutsuccess: number;

  get selectedRow(): any {
    return this.selected;
  }

  set selectedRow(value: any) {
    this.selected = value;
  }

  constructor(protected readonly service: AdministrableFormService<TOutput,
                                                                   TBaseCommand,
                                                                   TCreateCommand,
                                                                   TUpdateCommand,
                                                                   TDataView>,
              public readonly notificationActionsService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService) {
    super(service, notificationActionsService, popupService);
    this.timeOutsuccess = 5000;
  }

  ngOnInit() {
    this.init();
    this.subscribeToActionEventsAdministration();
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  protected init() {
    this.filters = new Dictionary<string>();
    this.initForm();
    this.setGridColumns();
    this.subscribeFilterChanges();
    this.setFocusFiltro();
  }

  abstract createForm(): void;
  abstract setGridColumns(): void;
  abstract setFocusFiltro(): void;
  abstract setFocusDetalle(): void;
  abstract fillControlsWithData(data: TDataView, isView: boolean): void;
  abstract clearForm(): void;
  abstract subscribeFilterChanges(): void;
  abstract mapControlsToCommand(): TBaseCommand;
  abstract getCreateSuccessMessage(): string;
  abstract getUpdateSuccessMessage(): string;

  protected subscribeToActionEventsAdministration() {
    this.notificationActionsService.clickSearch
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickSearch());

    this.notificationActionsService.clickAdd
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickAdd());

    this.notificationActionsService.clickEdit
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickEdit(row));

    this.notificationActionsService.clickView
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickView(row));

    this.notificationActionsService.selectedRows
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickSelectedRow(row));

    this.notificationActionsService.clickClear
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickClear());

    this.notificationActionsService.clickCopy
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickCopy(row));

    this.notificationActionsService.clickDelete
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickDelete(row));
  }

  protected initForm() {
    this.createForm();
    this.fcService.initialize(this.form);
    this.setDisabledGroup(true, 'detalle');
    this.setDisabledGroup(false, 'filtros');
  }

  protected clickClear() {
    this.form.reset({ emitEvent: true });
    this.selectedRow = [];
    this.init();
  }

  protected clickAdd() {
    this.disableButtons = false;
    this.setDisabledGroup(this.disableButtons, 'detalle');
    this.setDisabledGroup(true, 'filtros');
    this.esConsulta = false;
    this.editId = 0;
    this.esCopia = false;
    this.setFocusDetalle();
  }

  protected clickSelectedRow(row: any) {
    this.selectedRow = [];
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
  }

  protected clickEdit(row: any) {
    if (row) {
      this.isLoading = true;
      this.service.get(+row.id)
        .pipe(
          takeUntil(this.onDestroy),
          catchError((caught: Observable<void>) => {
            this.isLoading = false;
            return caught;
          })
        )
        .subscribe((data: TDataView) => {
          this.fillControls(data, false);
          this.isLoading = false;
        });
    }
  }

  protected clickView(row: any) {
    if (row) {
      this.isLoading = true;
      this.service.get(+row.id)
        .pipe(
          takeUntil(this.onDestroy),
          catchError((caught: Observable<void>) => {
            this.isLoading = false;
            return caught;
          })
        )
        .subscribe((data: TDataView) => {
          this.fillControls(data, true);
          this.isLoading = false;
        });
    }
  }

  protected clickCopy(row: any) {
    if (row) {
      this.isLoading = true;
      this.service.get(+row.id)
        .pipe(
          takeUntil(this.onDestroy),
          catchError((caught: Observable<void>) => {
            this.isLoading = false;
            return caught;
          })
        )
        .subscribe((data: TDataView) => {
          this.esCopia = true;
          this.fillControls(data, false);
          this.isLoading = false;
        });
    }
  }

  protected clickDelete(row: any) {
    if (row) {
      this.isLoading = true;
      this.service.delete(+row.id)
        .pipe(
          takeUntil(this.onDestroy),
          catchError((caught: Observable<void>) => {
            this.isLoading = false;
            return caught;
          })
        )
        .subscribe(() => {
          this.popupService.success(Resources.Messages.ElRegistroFueEliminadoExitosamente);
          this.isLoading = false;
          this.setFocusFiltro();
          this.search();
        });
    }
  }

  protected fillControls(data: TDataView, isView: boolean) {
    this.disableButtons = false;
    this.setDisabledGroup(true, 'filtros');
    if (isView) {
      this.setDisabledGroup(true, 'detalle');
      this.esConsulta = true;
      this.editId = 0;
    } else {
      this.setDisabledGroup(false, 'detalle');
      this.esConsulta = false;
      this.editId = this.esCopia ? 0 : data['id'];
      this.setFocusDetalle();
    }
    this.fillControlsWithData(data, isView);
  }

  private clickSearch() {
    this.selectedRow = [];
    this.editId = 0;
    this.esCopia = false;
  }

  public onClickCancelar() {
    this.cancelar();
  }

  protected cancelar() {
    this.disableButtons = true;
    this.clearForm();
    this.setDisabledGroup(this.disableButtons, 'detalle');
    this.setDisabledGroup(false, 'filtros');
    this.editId = 0;
    this.esCopia = false;
    this.setFocusFiltro();
  }

  public onClickAceptar() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
      if (this.editId > 0) {
        const command = this.mapControlsToCommand() as TUpdateCommand;
        command['id'] = this.editId;
        this.saveEditItem(command);
      } else {
        const command = this.mapControlsToCommand() as TCreateCommand;
        this.saveNewItem(command);
      }
    }
  }

  protected saveNewItem(command: TCreateCommand) {
    const messageLabel = this.esCopia ? Resources.Labels.Copiar
      : Resources.Labels.Agregar;
    this.runAction(this.service.create(command),
      this.getCreateSuccessMessage(),
      messageLabel);
  }

  protected saveEditItem(command: TUpdateCommand) {
    this.runAction(this.service.update(command),
      this.getUpdateSuccessMessage(),
      Resources.Labels.Modificar);
  }

  // region Helpers
  protected subscribeToFilterControlChanges(token: string, keyDict: string): void {
    const filterControl = this.form.get(token);
    if (filterControl) {
      filterControl.valueChanges.pipe(
        takeUntil(this.onDestroy)
      ).subscribe((value: any) => {
        this.filters[keyDict] = value;
      });
    }
  }

  protected setDisabledGroup(disabled: boolean, groupName: string): void {
    const formGroup = this.form.get(groupName);
    if (formGroup) {
      if (disabled) {
        formGroup.disable(({ onlySelf: true, emitEvent: false }));
      } else {
        formGroup.enable(({ onlySelf: true, emitEvent: false }));
      }
    }
  }

  protected runAction(action: Observable<any>, messageSuccess: string, titleSuccess: string): void {
    this.isLoading = true;
    action.pipe(
      takeUntil(this.onDestroy),
      catchError((caught: Observable<any>) => {
        this.isLoading = false;
        return caught;
      })
    ).subscribe(obs => {
      this.isLoading = false;
      this.cancelar();
      this.mostarMensaje(obs, messageSuccess, titleSuccess);
      this.notificationActionsService.onRefreshGrid();
      this.setDisabledGroup(false, 'filtros');
      this.setFocusFiltro();
    });
  }

  protected mostarMensaje(res: any, messageSuccess: string, titleSuccess: string) {
    const mensajeAmostrar = res && res.mensajeRepuesta ? res.mensajeRepuesta : '';
    this.popupService.success(messageSuccess + mensajeAmostrar, titleSuccess, { timeOut: this.timeOutsuccess });
  }

  protected ValidarFechaDesdeHasta(fechaDesde: string, fechaHasta: string): boolean {
    let fechasValidas = true;

    if (fechaDesde && fechaHasta) {
      const fechaDesdeDate = (new Date(fechaDesde + 'T00:00:00')).valueOf();
      const fechaHastaDate = (new Date(fechaHasta + 'T00:00:00')).valueOf();
      const fechaHoy = new Date().valueOf();
      if (fechaDesdeDate > fechaHoy) {
        this.popupService.error(Resources.Messages.FechaIngresadaDesdeMenorOIgualADiaHoy, Resources.Labels.Error);
        fechasValidas = false;
      }
      if (fechaHastaDate <= fechaHoy) {
        this.popupService.error(Resources.Messages.FechaIngresadaHastaMayorADiaHoy, Resources.Labels.Error);
        fechasValidas = false;
      }
      if (fechaDesdeDate > fechaHastaDate) {
        this.popupService.error(Resources.Messages.FechaDesdeDebeSerMenorOIgualAFechaHasta, Resources.Labels.Error);
        fechasValidas = false;
      }
    }
    return fechasValidas;
  }
  // endregion
}
