import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SearchFormComponent } from '../../core/components/search-form/search-form.component';
import { ReimprimirTicketPesajeDataView } from '../../shared/data-models/reimprimir-ticket-pesaje-data-view';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Dictionary } from '../../core/models/dictionary';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { SearchMovimientosReimpresionTicketPesajeService } from './services/search-movimientos-reimpresion-ticket-pesaje.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { ReimprimirTicketPesajeService } from './services/reimprimir-ticket-pesaje.service';
import { ReimprimirTicketPesajeCommand } from '../../shared/data-models/commands/cargas-descargas/reimprimir-ticket-pesaje-command';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { ComportamientoAfip, Permission } from '../../shared/enums/enums';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { MisImpresorasService } from '../mis-impresoras/mis-impresoras.service';
import { ImpresoraDataView } from '../../shared/data-models/impresora-data-view';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { TipoDocumentoPorte } from '../shared/data-models/tipo-documento-porte';

@Component({
  selector: 'yrd-reimprimir-ticket-pesaje',
  templateUrl: './reimprimir-ticket-pesaje.component.html',
  styleUrls: ['./reimprimir-ticket-pesaje.component.css'],
  providers: [{provide: SearchFormService, useClass: SearchMovimientosReimpresionTicketPesajeService}]
})

export class ReimprimirTicketPesajeComponent
extends SearchFormComponent<Array<ReimprimirTicketPesajeDataView>> implements OnInit, OnDestroy, AfterViewInit {

  private readonly onDestroy = new Subject();
  Permission = Permission;
  reimprimirTicketPesajeForm: FormGroup;
  columns: any;
  filters: Dictionary<string>;
  selectedRow: any = [];

  validationMessagesImpresora = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Impresora)
  };

  constructor(public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              searchMovimientosReimpresionticketPesajeService: SearchMovimientosReimpresionTicketPesajeService,
              public readonly notificationActionsService: SearchFormActionsNotifierService,
              private readonly fcService: FormComponentService,
              private readonly reimprimirTicketPesajeService: ReimprimirTicketPesajeService,
              private readonly misImpresorasService: MisImpresorasService,
              private readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
      super(searchMovimientosReimpresionticketPesajeService, notificationActionsService, popupService);
      this.botonesHabilitados = new Dictionary<boolean>();
  }

  ngOnInit() {
    this.setFilters();
    this.createForm();
    this.Init();
    this.subscribeToControlChanges();
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  ngAfterViewInit() {
    this.obtenerImpresoraDefectoUsuario();
  }

  private obtenerImpresoraDefectoUsuario() {
    this.misImpresorasService.ObtenerPorDefecto().subscribe((impresora: ImpresoraDataView) => {
      if (impresora) {
        this.fcService.setValue('impresion.impresora', impresora, {onlySelf: true});
      }
    });
  }

  private Init() {
    this.setGridColumns();
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
    this.filters.add('patente', '');
    this.filters.add('tipoDocPorte', '');
    this.filters.add('nroDocPorte', '');
    this.filters.add('ctg', '');
    this.filters.add('nroTicket', '');
    this.filters.add('numeroVagon', '');
  }

  private subscribeToControlChanges() {
    this.subscribeToFiltersChanges();
    this.subscribeToActionEventsPrivate();
  }


  private subscribeToFiltersChanges() {
    const patenteCtrl = this.reimprimirTicketPesajeForm.get('filtros.patente');
    const nroDocPorteCtrl  = this.reimprimirTicketPesajeForm.get('filtros.nroDocPorte');
    const ctgCtrl  = this.reimprimirTicketPesajeForm.get('filtros.ctg');
    const tipoDocPorteCtrl  = this.reimprimirTicketPesajeForm.get('filtros.tipoDocPorte');
    const nroTicketCtrl  = this.reimprimirTicketPesajeForm.get('filtros.nroTicket');
    const numeroVagonCtrl  = this.reimprimirTicketPesajeForm.get('filtros.numeroVagon');

    if (patenteCtrl && nroDocPorteCtrl && tipoDocPorteCtrl && nroTicketCtrl && numeroVagonCtrl && ctgCtrl) {
      patenteCtrl.valueChanges.subscribe((patenteValue: string) => {
        this.filters['patente'] = patenteValue;
      });
      nroDocPorteCtrl.valueChanges.subscribe((nroDocPorte: string) => {
        this.filters['nroDocPorte'] = nroDocPorte;
      });
      ctgCtrl.valueChanges.subscribe((ctg: string) => {
        this.filters['ctg'] = ctg;
      });
      tipoDocPorteCtrl.valueChanges.subscribe((tipoDocPorte: TipoDocumentoPorte) => {
        this.filters['tipoDocPorte'] = tipoDocPorte;
        this.consultarRegimenAfip(tipoDocPorte, ctgCtrl);
      });
      nroTicketCtrl.valueChanges.subscribe((turno: string) => {
        this.filters['nroTicket'] = turno;
      });
      numeroVagonCtrl.valueChanges.subscribe((numero: string) => {
        this.filters['numeroVagon'] = numero;
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

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.clickSearch
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.clickSearch()
      );

    this.notificationActionsService.clickClear
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.clickClear()
      );

    this.notificationActionsService.selectedRows
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickSelectedRow(row)
      );
  }

  private clickSearch() {
    this.selectedRow = [];
  }

  private clickClear() {
    this.clear();
  }

  public clear() {
    this.reimprimirTicketPesajeForm.reset( {emitEvent: true} );
    this.selectedRow = [];
    this.Init();
  }

  private clickSelectedRow(row) {
    this.selectedRow = [];
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
    this.habilitarImpresora();
  }

  private habilitarImpresora(): void {
    if (this.selectedRow.length === 1) {
      this.fcService.enableControl('impresion.impresora');
    } else {
      this.fcService.disableControl('impresion.impresora');
    }
  }

  private createForm() {
    this.reimprimirTicketPesajeForm = this.fb.group({
      filtros: this.fb.group({
        patente: { value: '', disabled: false },
        nroTicket: { value: '', disabled: false },
        tipoDocPorte: { value: '', disabled: false },
        nroDocPorte: ['', { validators: [Validators.minLength(8), Validators.pattern(/^\d+$/)], updateOn: 'blur' }],
        ctg: { value: '', disabled: false },
        numeroVagon: { value: '', disabled: false }
      }),
      impresion: this.fb.group({
        impresora: [{ value: '', disabled: true }, Validators.required],
      })
    });
    this.fcService.initialize(this.reimprimirTicketPesajeForm);
    this.subscribeCambioDocPorte();
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
        name: Resources.Labels.NroTicket,
        prop: 'nroTicket'
      },
      {
        name: Resources.Labels.TipoTransporte,
        prop: 'tipoTransporte'
      },
      {
        name: Resources.Labels.DocumentoPorte,
        prop: 'tipoDocPorte'
      },
      {
        name: Resources.Labels.NumeroDocumentoPorte,
        prop: 'nroDocPorte'
      },
      {
        name: Resources.Labels.CTG,
        prop: 'ctg'
      },
      {
        name: Resources.Labels.Patente,
        prop: 'patente'
      },
      {
        name: Resources.Labels.TipoMovimiento,
        prop: 'tipoMovimiento'
      },
      {
        name: Resources.Labels.Vagon,
        prop: 'vagon'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.Cosecha,
        prop: 'cosecha'
      },
      {
        name: Resources.Labels.Vendedor,
        prop: 'vendedor'
      },
      {
        name: Resources.Labels.Destinatario,
        prop: 'destinatario'
      }
    ];
}

  onClickReimprimir() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      if ( this.fcService.isValidForm()) {
        const movimiento = this.selectedRow as ReimprimirTicketPesajeDataView;
        if (movimiento[0]) {
          const command = new ReimprimirTicketPesajeCommand(movimiento[0].id);
          command.idImpresora = this.fcService.getValue('impresion.impresora');
          this.reimprimirTicketPesajeService.reimprimirTicket(command).subscribe(() => {
          this.fcService.disableControl('impresion.impresora');
          this.popupService.success(Resources.Messages.ReimpresionExitosa);
          });
        }
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Error);
    }
  }

  subscribeCambioDocPorte(): any {
    const nroDocPorte = this.reimprimirTicketPesajeForm.get('filtros.nroDocPorte');
    const tipoDocPorte = this.reimprimirTicketPesajeForm.get('filtros.tipoDocPorte');

    if (nroDocPorte && tipoDocPorte) {

      nroDocPorte.valueChanges.subscribe((nroDocPorteVal: string) => {
        if (nroDocPorteVal) {
          nroDocPorte.setValue(nroDocPorteVal, { onlySelf: true, emitEvent: false });
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
