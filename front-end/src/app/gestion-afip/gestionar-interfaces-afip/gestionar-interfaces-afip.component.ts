import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SearchFormComponent } from '../../core/components/search-form/search-form.component';
import { GestionarInterfacesAfipDataView } from './gestionar-interfaces-afip-data-view';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { Dictionary } from '../../core/models/dictionary';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { GestionarInterfacesAfipService } from './services/gestionar-interfaces-afip.service';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { ModalDetalleComponent } from '../../core/controls/modal-detalle/modal-detalle.component';
import { ModalConfirmacionManualComponent } from './modal-confirmacion-manual/modal-confirmacion-manual.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Permission } from '../../shared/enums/enums';

@Component({
  selector: 'yrd-gestionar-interfaces-afip',
  templateUrl: './gestionar-interfaces-afip.component.html',
  styleUrls: ['./gestionar-interfaces-afip.component.css'],
  providers: [{provide: SearchFormService, useClass: GestionarInterfacesAfipService}]
})
export class GestionarInterfacesAfipComponent extends SearchFormComponent<Array<GestionarInterfacesAfipDataView>>
implements OnInit, OnDestroy {
  Permission = Permission;

  @ViewChild('modalDetalleError') modalDetalleError: ModalDetalleComponent;
  @ViewChild('modalConfirmacionManual') modalConfirmacionManual: ModalConfirmacionManualComponent;
  gestionarInterfacesAfipForm: FormGroup;
  filters: Dictionary<string>;
  columns: any;
  selectedRows: any;
  estadosValidosParaModificar: number[];
  ControlarDescargaCamionCerealesPath = 'ControlarDescargaCamionCereales';
  GestionarControlPath = 'GestionarControl';
  ControlarDescargaCamionTransportesVariosPath = 'ControlarDescargaCamionTransportesVarios';
  private destroy$ = new Subject();

  constructor(private readonly fb: FormBuilder,
              private readonly gestionarInterfacesAfipService: GestionarInterfacesAfipService,
              public readonly notificationActionsService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly formComponentService: FormComponentService) {
    super(gestionarInterfacesAfipService, notificationActionsService, popupService);
  }

  ngOnInit() {
    this.Init();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearSubscriptions();
  }

  private Init() {
    this.createForm();
    this.setFilters();
    this.setGridColumns();
    this.subscribeToFiltersChanges();
    this.subscribeToActionEventsPrivate();
  }

  private setGridColumns() {
    this.columns = [
      { prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 30
      },
      {
        name: Resources.Labels.ServicioAfip,
        prop: 'servicioAfip'
      },
      {
        name: Resources.Labels.CartaPorte,
        prop: 'cartaPorte'
      },
      {
        name: Resources.Labels.CTG,
        prop: 'ctg'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.EstadoCamion,
        prop: 'estadoCamion'
      },
      {
        name: Resources.Labels.FechaEntrada,
        prop: 'fechaIngreso'
      }
    ];
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
    this.filters['servicio-afip'] = '';
  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.clickClear
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(() =>
      this.clickClear()
    );

    this.notificationActionsService.selectedRows
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(row =>
        this.clickselectedRows(row)
      );
  }
  clickClear(): void {
    this.gestionarInterfacesAfipForm.reset({emitEvent: true});
    this.selectedRows = null;
    this.Init();
  }

  private clickselectedRows(row) {
    this.selectedRows = null;
    if (row !== 'undefined') {
      this.selectedRows = row;
    }
  }

  private subscribeToFiltersChanges() {
    const servicioAfipCtrl = this.gestionarInterfacesAfipForm.get('filtros.servicioAfip');
    const fechaDesdeCtrl  = this.gestionarInterfacesAfipForm.get('filtros.fechaDesde');
    const fechaHastaCtrl = this.gestionarInterfacesAfipForm.get('filtros.fechaHasta');
    const ctgCtrl = this.gestionarInterfacesAfipForm.get('filtros.ctg');

    if (fechaDesdeCtrl && fechaHastaCtrl && servicioAfipCtrl && ctgCtrl) {
      servicioAfipCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
        this.filters['servicio-afip'] = value;
      });
      fechaDesdeCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
        this.filters['fecha-desde'] = value;
      });
      fechaHastaCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
        this.filters['fecha-hasta'] = value;
      });
      ctgCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
        this.filters['ctg'] = value;
      });
    }
  }

  onClickVerDetalle() {
    if (this.selectedRows && this.selectedRows.length === 1) {
      this.gestionarInterfacesAfipService.recuperarDetalleError(this.selectedRows[0].id)
                .pipe(takeUntil(this.destroy$))
                .subscribe((detalle: string) => this.modalDetalleError.open(detalle));
     } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Consultar);
    }
  }

  onClickConfirmacionManual() {
    if (this.selectedRows && this.selectedRows.length === 1) {
      this.modalConfirmacionManual.abrir(this.selectedRows[0].id);
     } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Confirmar);
    }
  }

  onInterfazConfirmada() {
    this.search();
    this.selectedRows = [];
  }

  onClickReIntentar() {
    if (this.selectedRows && this.selectedRows.length === 1) {
      this.gestionarInterfacesAfipService.reintentar(this.selectedRows[0].id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((value: any) => {
            if (!value) {
              this.search();
              this.selectedRows = [];
            }
          });
     } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Reintentar);
    }
  }

  private createForm() {
    this.gestionarInterfacesAfipForm = this.fb.group({

      filtros: this.fb.group({
        servicioAfip: undefined,
        fechaDesde: '',
        fechaHasta: '',
        ctg: {value: '', disabled: false},
        detalleError: ''
      }),
    });

    this.subscribeCambioDocPorte();
  }

  private agregarMascaraDocPorte(nroDocPorteVal: string): string {
    return this.formComponentService.applyMask(nroDocPorteVal, '000000000000', 12);
  }

  private subscribeCambioDocPorte(): any {
    const nroDocPorte = this.gestionarInterfacesAfipForm.get('filtros.nroDocPorte');
    const tipoDocPorte = this.gestionarInterfacesAfipForm.get('filtros.tipoDocPorte');

    if (nroDocPorte && tipoDocPorte) {

      nroDocPorte.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((nroDocPorteVal: string) => {
        const valorConMascara = this.agregarMascaraDocPorte(nroDocPorteVal);
        if (nroDocPorteVal) {
          nroDocPorte.setValue(valorConMascara, {onlySelf: true, emitEvent: false});
          tipoDocPorte.setValidators(Validators.required);
          tipoDocPorte.updateValueAndValidity();
        } else {
          tipoDocPorte.clearValidators();
          tipoDocPorte.setValue('');
        }
      });
    }
  }
}
