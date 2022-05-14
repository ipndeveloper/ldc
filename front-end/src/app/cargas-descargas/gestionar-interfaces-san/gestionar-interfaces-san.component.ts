import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Dictionary } from '../../core/models/dictionary';
import { Resources } from '../../../locale/artifacts/resources';
import { SearchFormComponent } from '../../core/components/search-form/search-form.component';
import { GestionarInterfacesSanDataView } from './gestionar-interfaces-san-data-view';
import { PopupService } from '../../core/services/popupService/popup.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { InterfacesSanService } from './search-interfaces-san.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { EstadoInterfazSan } from '../../shared/data-models/estado-interfaz-san';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable, Subscription } from 'rxjs';
import { EstadosInterfazSan, Permission, ComportamientoAfip } from '../../shared/enums/enums';
import { ModalMostrarMensajeComponent } from '../shared/modals/modal-mostrar-mensaje/modal-mostrar-mensaje.component';
import { ReintentarInterfazSanCommand } from '../../shared/data-models/commands/cargas-descargas/reintentar-interfaz-san-command';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';


@Component({
  selector: 'yrd-gestionar-interfaces-san',
  templateUrl: './gestionar-interfaces-san.component.html',
  styleUrls: ['./gestionar-interfaces-san.component.css']
})
export class GestionarInterfacesSanComponent extends SearchFormComponent<Array<GestionarInterfacesSanDataView>>
                                             implements OnInit, OnDestroy {
  Permission = Permission;

  private readonly onDestroy = new Subject();
  selectedRow: any;
  form: FormGroup;
  filters: Dictionary<string>;
  columns: any;
  rows: any;
  onSearchSubscription: Subscription;

  @ViewChild('modalDetalle') modalDetalle: ModalMostrarMensajeComponent;

  get selectedInterfaz(): GestionarInterfacesSanDataView {
    return this.selectedRow ? this.selectedRow[0] : null;
  }

  constructor(private readonly fb: FormBuilder,
              private readonly dropdownNotificationService:  DropdownNotificationService<EstadoInterfazSan>,
              private readonly service: InterfacesSanService,
              notificationActionsService: SearchFormActionsNotifierService,
              popupService: PopupService,
              private readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
    super(service, notificationActionsService, popupService);
  }

  ngOnInit() {
    this.filters = new Dictionary<string>();
    this.onSearchSubscription = this.init().subscribe(() => {
      this.search();
      this.onSearchSubscription.unsubscribe();
    });
  }

  private init(): Observable<void> {
    this.createForm();
    this.initializeGrid();
    this.subscribeFilterChanges();
    this.subscribeToActionEventsCustom();
    this.subscribeToFiltersChanges();
    return this.subscribeToDropDownEvents();
  }

  private createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        servicioSan: '',
        estado: {id: -1},
        tipoTransporte: '',
        tipoMovimiento: '',
        nroDocPorte: '',
        fechaIngresoDesde: '',
        fechaIngresoHasta: '',
        ctg: '',
        tipoDocPorte: '',
      }),
    });
  }

  private initializeGrid(): void {
    this.columns = [
      {
        prop: 'selected',
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
        name: Resources.Labels.ServicioSan,
        prop: 'servicioSan',
      },
      {
        name: Resources.Labels.TipoMovimiento,
        prop: 'tipoMovimiento',
      },
      {
        name: Resources.Labels.TipoTransporte,
        prop: 'tipoTransporte',
      },
      {
        name: Resources.Labels.TipoDocumentoPorte,
        prop: 'tipoDocPorte',
      },
      {
        name: Resources.Labels.NumeroDocumentoPorte,
        prop: 'numeroDocPorte',
      },
      {
        name: Resources.Labels.CTG,
        prop: 'ctg',
      },
      {
        name: Resources.Labels.Vagon,
        prop: 'vagon',
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto',
      },
      {
        name: Resources.Labels.FechaEntrada,
        prop: 'fechaEntrada',
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado',
      },
      {
        name: Resources.Labels.FechaPocesamiento,
        prop: 'fechaProcesamiento',
      },
    ];
  }

  private subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.estado', 'estado');
    this.subscribeToFilterControlChanges('filtros.servicioSan', 'servicioSan');
    this.subscribeToFilterControlChanges('filtros.tipoMovimiento', 'tipoMovimiento');
    this.subscribeToFilterControlChanges('filtros.tipoTransporte', 'tipoTransporte');
    this.subscribeToFilterControlChanges('filtros.nroDocPorte', 'nroDocPorte');
    this.subscribeToFilterControlChanges('filtros.fechaIngresoDesde', 'fechaIngresoDesde');
    this.subscribeToFilterControlChanges('filtros.fechaIngresoHasta', 'fechaIngresoHasta');
    this.subscribeToFilterControlChanges('filtros.ctg', 'ctg');
    this.subscribeToFilterControlChanges('filtros.tipoDocPorte', 'tipoDocPorte');
  }

  private subscribeToFiltersChanges() {
    const tipoDocumentoCtrl = this.form.get('filtros.tipoDocPorte');
    const ctgCtrl = this.form.get('filtros.ctg');

    if (tipoDocumentoCtrl && ctgCtrl) {
      tipoDocumentoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['tipo-documento'] = value;
        this.consultarRegimenAfip(value, ctgCtrl);
      });
    }
  }

  consultarRegimenAfip(tipoDocumento: any, ctgCtrl: AbstractControl) {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(tipoDocumento ? tipoDocumento.id : 0)
      .subscribe(regimenAfip => {
        if ((regimenAfip === ComportamientoAfip.RegimenElectronico) || (tipoDocumento === undefined)) {
          ctgCtrl.enable();
          return;
        }
        ctgCtrl.disable();
        ctgCtrl.reset();
      });
  }

  private subscribeToFilterControlChanges(token: string, keyDict: string): void {
    const filterControl = this.form.get(token);
    if (filterControl) {
      filterControl.valueChanges.subscribe((value: any) => {
        this.filters[keyDict] = value;
      });
    }
  }

  private subscribeToDropDownEvents(): Observable<void> {
    return new Observable(obs => {
      this.dropdownNotificationService.allItemsWereSelected
      .pipe(takeUntil(this.onDestroy))
      .subscribe(entities => {
        this.filters['allEstado'] = entities.filter(e => e.id !== EstadosInterfazSan.Finalizado);
        obs.next();
      });
    });
  }

  private subscribeToActionEventsCustom(): void {
    this.notificationActionsService.selectedRows
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickSelectedRow(row));

    this.notificationActionsService.clickClear
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickClear());
  }

  private clickSelectedRow(row): void {
    this.selectedRow = null;
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
  }

  private clickClear(): void {
    this.form.reset({emitEvent: true});
    this.selectedRow = null;
    this.init();
  }

  onVerDetalle(): void {
    this.realizarAccion([EstadosInterfazSan.MovimientoRechazado, EstadosInterfazSan.ErrorTecnico, EstadosInterfazSan.Finalizado], () => {
      this.modalDetalle.open(this.selectedInterfaz.detalle);
    });
  }

  onReintentar(): void {
    this.realizarAccion([EstadosInterfazSan.MovimientoRechazado, EstadosInterfazSan.ErrorTecnico], () => {
      const command = new ReintentarInterfazSanCommand(this.selectedInterfaz.id);
      this.service.reintentar(command)
                  .subscribe(() => this.popupService.success(Resources.Messages.ReintentoExitoso));
    });
  }

  onReEjecutar(): void {
    this.popupService.info(Resources.Messages.ReEjecutandoInterfaces);
    this.service.reEjecutar().subscribe(() => this.popupService.success(Resources.Messages.InterfacesReEjecutadas));
  }

  private realizarAccion(estadosValidos: number[], func: () => void) {
    if (this.selectedInterfaz) {
      if (estadosValidos.some(e => e === this.selectedInterfaz.idEstado)) {
        func();
      } else {
        this.popupService.error(Resources.Messages.LaInterfazNoSeEncuentraEnUnEstadoValidoParaRealizarLaAccion);
      }
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

}
