import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetalleReembolsoTasaMunicipalComponent } from './detalle-reembolso-tasa-municipal/detalle-reembolso-tasa-municipal.component';
import { FiltroReembolsoTasaMunicipalComponent } from './filtro-reembolso-tasa-municipal/filtro-reembolso-tasa-municipal.component';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ReembolsoTasaMunicipalService } from './reembolso-tasa-municipal.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { takeUntil } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';
import { ReembolsoTasaMunicipalCommand } from '../../shared/data-models/commands/cargas-descargas/reembolso-tasa-municipal-command';
import { Dictionary } from '../../core/models/dictionary';

@Component({
  selector: 'yrd-reembolso-tasa-municipal',
  templateUrl: './reembolso-tasa-municipal.component.html',
  styleUrls: ['./reembolso-tasa-municipal.component.css']
})
export class ReembolsoTasaMunicipalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('filtro') filtro: FiltroReembolsoTasaMunicipalComponent;
  @ViewChild('detalle') detalle: DetalleReembolsoTasaMunicipalComponent;
  private readonly onDestroy: ReplaySubject<Boolean> = new ReplaySubject();
  form: FormGroup;
  disableButtons: boolean;
  filters: Dictionary<string>;

  constructor(private readonly fb: FormBuilder,
    private readonly fcService: FormComponentService,
    private readonly reembolsoTasaMunicipalService: ReembolsoTasaMunicipalService,
    private readonly popupService: PopupService) {
     }

  ngOnInit(): void {
    this.createForm();
    this.setFilters();
    this.subscribeToFiltersChanges();
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  ngAfterViewInit(): void {
    this.filtro.setEnableFiltroBusqueda(true);
  }

  private createForm(): void {
    this.form = this.fb.group({
      filtro: this.fb.group({
        patenteCamion: ['', { disabled: false, validators: [Validators.minLength(3)]} ],
        tipoDocumentoPorte: [{ value: '', disabled: false }],
        numeroDocumentoPorte: ['', { validators: [Validators.minLength(8), Validators.pattern(/^\d+$/)], updateOn: 'blur'}]
      }),
      movimiento: this.fb.group({
        id: { value: '', disabled: true },
        patenteCamion: { value: '', disabled: true },
        tipoDocumentoPorte: { value: '', disabled: true },
        numeroDocumentoPorte: { value: '', disabled: true },
        pesoBruto: { value: '', disabled: true },
        moneda: { value: '', disabled: true },
        tarifa: { value: '', disabled: true },
        medioDePago: { value: '', disabled: true }
      })
    });

    this.fcService.initialize(this.form);
    this.disableButtons = true;
  }

  onClickAceptar(noPago: boolean): void {
      this.popupService.confirmOk(() => {
        const command = this.mapControlsToCommand();
        command.NoPago = noPago;
        this.reembolsoTasaMunicipalService.registrarReembolso(command).pipe(
          takeUntil(this.onDestroy)
        ).subscribe(() => {
          this.popupService.success(
            Resources.Messages.ElReembolsoHaSidoRegistradoExitosamente,
            Resources.Labels.Exito
          );
          this.resetForm();
        });
      }, Resources.Messages.DeseaConfirmarEstaAccion, Resources.Labels.Confirmar);
  }

  private mapControlsToCommand(): ReembolsoTasaMunicipalCommand {
    const command = new ReembolsoTasaMunicipalCommand();
    command.idMovimiento = Number(this.fcService.getValue('movimiento.id'));
    command.idMedioDePago = Number(this.fcService.getValue('movimiento.medioDePago'));
    command.tarifa = Number(this.fcService.getValue('movimiento.tarifa'));
    command.idPagoMercadoPago = this.fcService.getValue('movimiento.idPagoMercadoPago');
    command.idOrdenMercadoPago = this.fcService.getValue('movimiento.idOrdenMercadoPago');
    command.kgPesoBruto = this.fcService.getValue('movimiento.pesoBruto');
    command.idMoneda = Number(this.fcService.getValue('movimiento.moneda'));
    return command;
  }

  private subscribeToFiltersChanges() {
    const tipoDocumentoCtrl = this.form.get('filtro.tipoDocumentoPorte');
    const nroDocumentoCtrl = this.form.get('filtro.numeroDocumentoPorte');
    const patenteCamionCtrl = this.form.get('filtro.patenteCamion');

    if (tipoDocumentoCtrl && nroDocumentoCtrl && patenteCamionCtrl) {
      tipoDocumentoCtrl.valueChanges.subscribe((value: string) => {
        this.filters['tipo-documento'] = value;
      });
      nroDocumentoCtrl.valueChanges.subscribe((value: string) => {
        this.filters['nro-documento'] = value;
      });
      patenteCamionCtrl.valueChanges.subscribe((value: string) => {
        this.filters['patenteCamion'] = value;
      });
    }
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
  }

  onClickCancelar(): void {
    this.popupService.confirmOk(() => {
      this.resetForm();
    }, Resources.Messages.DeseaConfirmarEstaAccion, Resources.Labels.Confirmar);
  }

  onClickBuscar(): void {
    if (this.reembolsoTasaMunicipalService.validateSearchClick(this.filters)) {
      this.search();
    }
  }

  search() {
    this.reembolsoTasaMunicipalService.getData(this.filters)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(datos => {
          if (datos) {
            this.filtro.setEnableFiltroBusqueda(false);
            this.detalle.completaDatoMovimiento(datos);
            this.disableButtons = false;
          } else {
            this.popupService.error(
              Resources.Messages.NoSeEncontraronResultados,
              Resources.Labels.Error
            );
          }
        });
  }

  private resetForm(): void {
    this.filtro.setEnableFiltroBusqueda(true);
    this.disableButtons = true;
    this.fcService.resetForm({emitEvent: true});
  }

  onClickReembolsar(): void {
    this.onClickAceptar(false);
  }

}
