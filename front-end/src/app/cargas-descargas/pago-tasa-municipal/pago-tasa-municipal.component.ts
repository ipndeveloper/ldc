import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { takeUntil, catchError } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';
import { Collection } from '../../core/models/collection';
import { FiltroPagoTasaMunicipalComponent } from './filtro-pago-tasa-municipal/filtro-pago-tasa-municipal.component';
import { DetallePagoTasaMunicipalComponent } from './detalle-pago-tasa-municipal/detalle-pago-tasa-municipal.component';
import { PagoTasaMunicipalService } from './pago-tasa-municipal.service';
import { PagoTasaMunicipalCommand } from '../../shared/data-models/commands/cargas-descargas/pago-tasa-municipal-command';
import { Dictionary } from '../../core/models/dictionary';
import { MediosDePago, EstadosPagoTasaMunicipal, Permission } from '../../shared/enums/enums';
import { ReembolsoTasaMunicipalService } from './reembolso-tasa-municipal.service';

@Component({
  selector: 'yrd-pago-tasa-municipal',
  templateUrl: './pago-tasa-municipal.component.html',
  styleUrls: ['./pago-tasa-municipal.component.css']
})
export class PagoTasaMunicipalComponent implements OnInit, OnDestroy {

  @ViewChild('filtro') filtro: FiltroPagoTasaMunicipalComponent;
  @ViewChild('detalle') detalle: DetallePagoTasaMunicipalComponent;
  private readonly onDestroy: ReplaySubject<Boolean> = new ReplaySubject();
  form: FormGroup;
  disableButtons: boolean;
  filters: Dictionary<string>;

  Permission = Permission;

  constructor(private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              private readonly pagoTasaMunicipalService: PagoTasaMunicipalService,
              private readonly reembolsoTasaMunicipalService: ReembolsoTasaMunicipalService,
              private readonly popupService: PopupService) {
  }

  ngOnInit(): void {
    this.setFilters();
    this.createForm();
    this.subscribeToFiltersChanges();
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }


  generarPago(noPago: boolean = false) {
    if (noPago || this.fcService.isValidForm()) {
      this.popupService.confirmOk(() => {
        this.disableButtons = true;
        const command = this.mapControlsToCommand();
        command.NoPago = noPago;
        this.pagoTasaMunicipalService.registrarPago(command).pipe(
          takeUntil(this.onDestroy)
        )
        .pipe(catchError((caught: Observable<void>) => {
          this.disableButtons = false;
          return caught;
        })).subscribe(() => {
          this.popupService.success(
            noPago ? Resources.Messages.ElPagoExceptuadoHaSidoRegistradoExitosamente
            : Resources.Messages.ElPagoHaSidoRegistradoExitosamente,
            Resources.Labels.Exito
          );
          this.resetForm();
        });
      }, Resources.Messages.DeseaConfirmarEstaAccion, Resources.Labels.Confirmar);
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  esLecturaAutomatica() {
    return this.detalle.qrComponent.lecturaEnModoAutomatico;
  }

  onQrAceptado(): void {
    this.generarPago(false);
  }

  onClickCancelar(): void {
    this.popupService.confirmOk(() => {
      this.resetForm();
    }, Resources.Messages.DeseaConfirmarEstaAccion, Resources.Labels.Confirmar);
  }

  onClickBuscar() {
    if (this.pagoTasaMunicipalService.validateSearchClick(this.filters)) {
      this.search();
    }
  }

  search() {
    this.pagoTasaMunicipalService.getData(this.filters)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        if (datos) {
          if (datos.estadoPago && datos.estadoPago.id === EstadosPagoTasaMunicipal.NoPago) {
            this.popupService.confirm(Resources.Messages.ExisteExcepcionDePago)
            .then(confirmo => {
              if (confirmo) {
                this.filtro.setEnableFiltroBusqueda(false);
                this.detalle.completaDatoMovimiento(datos);
                this.disableButtons = false;
              } else {
                this.resetForm();
              }
            });
          } else {
            this.filtro.setEnableFiltroBusqueda(false);
            this.detalle.completaDatoMovimiento(datos);
            this.disableButtons = false;
          }

        } else {
          this.popupService.error(
            Resources.Messages.PorFavorIngreseUnMovimientoEnCircuito,
            Resources.Labels.Error
          );
        }
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      filtro: this.fb.group({
        patenteCamion: ['', { disabled: false, validators: [Validators.minLength(3)]} ],
        tarjeta: [{ value: '', disabled: true }, Validators.pattern('^[0-9]*$')]
      }),
      movimiento: this.fb.group({
        id: { value: '', disabled: true },
        pesoBruto: { value: '', disabled: true },
        moneda: ['', {validators: [Validators.required], disabled: true}],
        ticketDePago: ['', {validators: [Validators.required], disabled: true}],
        tarifa: { value: '', disabled: true },
        medioDePago: ['', {validators: [Validators.required], disabled: true}],
        qr: { value: '', disabled: true },
      })
    });

    this.fcService.initialize(this.form);
    this.disableButtons = true;
  }

  private subscribeToFiltersChanges() {
    const tarjetaCtrl = this.form.get('filtro.tarjeta');
    const patenteCamionCtrl = this.form.get('filtro.patenteCamion');

    if (tarjetaCtrl && patenteCamionCtrl) {
      tarjetaCtrl.valueChanges.subscribe((value: string) => {
        this.filters['tarjeta'] = value;
      });
      patenteCamionCtrl.valueChanges.subscribe((value: string) => {
        this.filters['patenteCamion'] = value;
      });
    }
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
  }

  onClickPagar(): void {
    if (this.fcService.isValidForm()) {
      const idMedioDePago = this.fcService.getValue('movimiento.medioDePago');
      if (this.esLecturaAutomatica() && idMedioDePago && Number(idMedioDePago) === MediosDePago.MercadoPago) {
        this.detalle.mostrarLecturaQR();
      } else {
        this.generarPago();
      }
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  onClickNoPagar(): void {
    this.generarPago(true);
  }

  private resetForm(): void {
    this.filtro.setEnableFiltroBusqueda(true);
    this.detalle.setEnablePagoForm();
    this.detalle.setEnableMedioPago(false);
    this.disableButtons = true;
    this.fcService.resetForm({emitEvent: true});
  }

  private mapControlsToCommand(): PagoTasaMunicipalCommand {
    const command = new PagoTasaMunicipalCommand();
    command.id = Number(this.fcService.getValue('movimiento.id'));
    command.idMovimiento = this.detalle.getIdMovimiento();
    command.idMedioDePago = Number(this.fcService.getValue('movimiento.medioDePago'));
    command.tarifa = Number(this.fcService.getValue('movimiento.tarifa'));
    command.idPagoMercadoPago = this.fcService.getValue('movimiento.idPagoMercadoPago');
    command.idOrdenMercadoPago = this.fcService.getValue('movimiento.idOrdenMercadoPago');
    command.codigoQr = this.fcService.getValue('movimiento.qr');
    command.kgPesoBruto = this.fcService.getValue('movimiento.pesoBruto');
    command.idMoneda = Number(this.fcService.getValue('movimiento.moneda'));
    command.ticketDePago = this.fcService.getValue('movimiento.ticketDePago');
    return command;
  }

  onClickReembolsar(): void {
    this.popupService.confirmOk(() => {
      this.disableButtons = true;
      const command = this.mapControlsToCommand();
      this.reembolsoTasaMunicipalService.registrarReembolso(command).pipe(
        takeUntil(this.onDestroy)
      )
      .pipe(catchError((caught: Observable<void>) => {
        this.disableButtons = false;
        return caught;
      })).subscribe(() => {
        this.popupService.success(
          Resources.Messages.ElReembolsoHaSidoRegistradoExitosamente,
          Resources.Labels.Exito
        );
        this.resetForm();
      });
    }, Resources.Messages.DeseaConfirmarEstaAccion, Resources.Labels.Confirmar);
  }
}
