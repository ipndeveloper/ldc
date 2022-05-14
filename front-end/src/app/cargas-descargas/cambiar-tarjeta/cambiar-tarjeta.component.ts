import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import * as HttpStatus from 'http-status-codes';
import { DocumentoPorteComponent } from '../shared/documento-porte/documento-porte.component';
import { CambiarTarjetaService } from './cambiar-tarjeta.service';
import { MovimientoCambioTarjeta } from '../../shared/data-models/movimiento-cambio-tarjeta';
import { DetalleCambiarTarjetaComponent } from './detalle-cambiar-tarjeta/detalle-cambiar-tarjeta.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { TipoTransporte, EntitiesTiposTransporte } from '../../shared/data-models/tipo-transporte';
import { ComportamientoAfip, TiposTransporte } from '../../shared/enums/enums';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Collection } from '../../core/models/collection';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CommandService, Command } from '../../shared/command-service/command.service';
import { TipoDocumentoPorte } from '../shared/data-models/tipo-documento-porte';
import { ModalSeleccionarRemitoComponent } from '../shared/modal-seleccionar-remito/modal-seleccionar-remito.component';
import { ModalSeleccionarRemitoDataView } from '../../shared/data-models/modal-seleccionar-remito-data-view';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

@Component({
  selector: 'yrd-cambiar-tarjeta',
  templateUrl: './cambiar-tarjeta.component.html',
  styleUrls: ['./cambiar-tarjeta.component.css']
})
export class CambiarTarjetaComponent implements OnInit, OnDestroy {

  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('detalle') detalle: DetalleCambiarTarjetaComponent;
  @ViewChild('modalSeleccionarRemito') modalSeleccionarMovimiento: ModalSeleccionarRemitoComponent;

  cambiarTarjetaForm: FormGroup;
  filtroForm: FormGroup;
  detalleForm: FormGroup;
  subscription: Subscription;
  maskRegex: Array<any>;
  tipoTransporte: TipoTransporte;
  tipoDocumentoPorte: TipoDocumentoPorte;
  esRegimenElectronico = false;

  movimiento?: MovimientoCambioTarjeta;
  idBusqueda: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly service: CambiarTarjetaService,
    private readonly fcService: FormComponentService,
    private readonly commandService: CommandService,
    private readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
      this.subscription = this.commandService.commands.subscribe(c => this.handleCommand(c));
  }

  handleCommand(command: Command) {
    switch (command.name) {
      case 'Aceptar':
        this.onAceptado();
        break;
      case 'Cancelar':
        this.onCancelado();
        break;
    }
  }

  ngOnInit() {
    this.crearForm();
    this.subscribeCambioTransporte();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buscar() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.filtroForm.controls, errors, '');
    if (this.fcService.isValidForm()) {
      this.buscarMovimientos();
    }
  }

  limpiar() {
    this.filtroForm.reset();
  }

  onAceptado() {
    if (this.detalleForm.valid) {
      this.cambiarTarjeta();
    }
  }

  onCancelado() {
    this.resetForm();
    this.movimiento = undefined;
    this.detalleForm.controls.tarjetaNueva.disable();
    }

  private resetForm() {
    this.detalleForm.reset();
    this.filtroForm.reset();
    this.filtroForm.enable();
    this.subscribeCambioTransporte();
    this.suscribirseCambioTipoDocumentoPorte();
    this.filtroForm.controls.numeroDocumentoPorte.setValue('', { onlySelf: true });
  }


  private alternarForm() {
    if (this.movimiento) {
      this.detalleForm.patchValue(this.movimiento);
      this.detalleForm.controls.tarjetaNueva.enable();
      this.filtroForm.disable();
      this.detalle.setFocus();
    } else {
      this.detalleForm.reset();
    }
  }

  private buscarMovimientos() {
    const nroVagonCtrl = this.filtroForm.get('numeroVagon');
    const nroDocPorteCtrl = this.filtroForm.get('numeroDocumentoPorte');
    const patenteCamionCtrl = this.filtroForm.get('patenteCamion');
    const ctgCtrl = this.filtroForm.get('ctg');
    if (nroVagonCtrl && nroDocPorteCtrl && patenteCamionCtrl && ctgCtrl) {
      if (this.validarFiltros(nroVagonCtrl, nroDocPorteCtrl, patenteCamionCtrl, ctgCtrl)) {
        this.popupService.error(Resources.Messages.VerificarDatosFiltroBusqueda, Resources.Labels.Buscar);
        return;
      }
      this.service.buscarMovimientos(nroDocPorteCtrl.value, this.tipoDocumentoPorte.id, nroVagonCtrl.value,
                                      patenteCamionCtrl.value, ctgCtrl.value)
        .subscribe(movimientos => {
          if (movimientos.length === 1) {
            this.buscarMovimientoPorId(movimientos[0].id);
          } else {
            this.modalSeleccionarMovimiento.open(movimientos);
          }
      }, (error: HttpErrorResponse) => {
        if (error.status === HttpStatus.NOT_FOUND) {
          this.popupService.error(Resources.Messages.NoSeEncontraronResultados, Resources.Labels.Buscar);
        }
      });
    }

  }

  buscarMovimientoPorId(idMovimiento?: number, movimientoModal?: ModalSeleccionarRemitoDataView) {
    // tslint:disable-next-line: no-non-null-assertion
    this.idBusqueda = movimientoModal != null ? movimientoModal.id : idMovimiento ? idMovimiento : 0;
    this.service.buscarMovimientoPorId(this.idBusqueda)
        .subscribe(movimiento => {
          if (movimiento) {
            this.movimiento = movimiento;
            this.alternarForm();
        }
      }, (error: HttpErrorResponse) => {
        if (error.status === HttpStatus.NOT_FOUND) {
          this.popupService.error(Resources.Messages.NoSeEncontraronResultados, Resources.Labels.Buscar);
        }
      });
  }

  private cambiarTarjeta() {
    if (this.movimiento) {
      const idMovimiento = this.movimiento.id;
      const numeroTarjetaNueva = this.detalleForm.controls['tarjetaNueva'].value;

      this.service.cambiarTarjeta(idMovimiento, numeroTarjetaNueva)
        .subscribe(() => {
            this.popupService.success(Resources.Messages.LaTarjetaFueAsignada, Resources.Labels.AsignarTarjeta);
            this.onCancelado();
          },
          () => {
            this.detalleForm.controls.tarjetaNueva.setValue('', { onlySelf: true });
            this.detalle.setFocus();
          }
        );
    }
  }

  private crearForm() {
    this.crearFiltroForm();
    this.crearDetalleForm();

    this.cambiarTarjetaForm = this.fb.group({
      filtro: this.filtroForm,
      detalle: this.detalleForm
    });

    this.tipoTransporte = EntitiesTiposTransporte.Camion;
  }

  private crearFiltroForm() {
    this.filtroForm = this.fb.group({
      tipoDocumentoPorte: '',
      numeroDocumentoPorte: '',
      numeroVagon: '',
      tipoTransporte: '',
      patenteCamion: '',
      ctg: ''
    });
    this.fcService.initialize(this.filtroForm);

    this.suscribirseCambioTipoDocumentoPorte();
  }

  private crearDetalleForm() {
    this.detalleForm = this.fb.group({
      tipoMovimiento: { value: '', disabled: true },
      producto: { value: '', disabled: true },
      codigoCupo: { value: '', disabled: true },
      estadoCupo: { value: '', disabled: true },
      patenteCamion: { value: '', disabled: true },
      patenteAcoplado: { value: '', disabled: true },
      remitenteComercial: { value: '', disabled: true },
      corredor: { value: '', disabled: true },
      destinatario: { value: '', disabled: true },
      finalidad: { value: '', disabled: true },
      tarjetaActual: { value: '', disabled: true },
      tarjetaNueva: [{ value: '', disabled: true }, Validators.required]
    });
  }

  suscribirseCambioTipoDocumentoPorte() {
    const tipoDocumentoPorte = this.filtroForm.get('tipoDocumentoPorte');
    if (tipoDocumentoPorte) {
      tipoDocumentoPorte.valueChanges.pipe(
        distinctUntilChanged()
      ).subscribe((tipo: TipoDocumentoPorte) => {
        if (tipo && tipo.mascara) {
          this.tipoDocumentoPorte = tipo;
          this.consultarRegimenAfip(tipoDocumentoPorte.value);
          this.setTipoDocumentoPorteRegex(tipo.mascara);
        }
      });

    }
  }

  private subscribeCambioTransporte() {
    const tipoTrasporte = this.filtroForm.get('tipoTransporte');
    const numeroVagon = this.filtroForm.get('numeroVagon');
    const numeroDocumentoPorte = this.filtroForm.get('numeroDocumentoPorte');
    const patenteCamion = this.filtroForm.get('patenteCamion');
    if (tipoTrasporte && numeroVagon && numeroDocumentoPorte && patenteCamion) {
      tipoTrasporte.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((value: TipoTransporte) => {
          if (value) {
            if (value.id === TiposTransporte.Camion) {
              this.filtroForm.controls.patenteCamion.enable();
              this.filtroForm.controls.numeroVagon.disable();
              numeroVagon.setValue('');
              patenteCamion.setValue('');
            } else {
              this.filtroForm.controls.numeroVagon.enable();
              this.filtroForm.controls.patenteCamion.disable();
              patenteCamion.setValue('');
              numeroVagon.setValue('');
            }
            this.tipoTransporte = value;
          }
        });
    }
  }

  private setTipoDocumentoPorteRegex(mascara: string) {
    this.maskRegex = [];
    for (const char of mascara) {
      if (char === '-') {
        this.maskRegex.push('-');
      } else {
        this.maskRegex.push(/[0-9 ]+/);
      }
    }
  }

  consultarRegimenAfip(tipoDocumento: any) {
    const ctgCtrl = this.filtroForm.get('ctg');
    this.tipoDocumentoPorteService.consultarComportamientoAfip(tipoDocumento ? tipoDocumento.id : 0)
      .subscribe(regimenAfip => {
        if (ctgCtrl) {
          (regimenAfip === ComportamientoAfip.RegimenElectronico) || (tipoDocumento === undefined) ? ctgCtrl.enable() : ctgCtrl.disable();
          ctgCtrl.reset();
        }
      });
  }

  validarFiltros(nroVagonCtrl: AbstractControl, nroDocPorteCtrl: AbstractControl, patenteCtrl: AbstractControl, ctgCtrl: AbstractControl) {
    return (ctgCtrl && nroDocPorteCtrl && nroVagonCtrl && patenteCtrl &&
      !ctgCtrl.value && !nroDocPorteCtrl.value && !nroVagonCtrl.value &&  !patenteCtrl.value);
  }

}
