import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ReimprimirTurnoPlayaService } from './reimprimir-turno-playa.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { TiposMovimiento, EstadosMovimiento } from '../../shared/enums/enums';
import { FiltroReimprimirTurnoPlayaComponent } from './filtro-reimprimir-turno-playa/filtro-reimprimir-turno-playa.component';
import { ReimprimirTurnoPlayaDataView } from '../../shared/data-models/reimprimir-turno-playa-data-view';
import { ReimprimirTurnoPlayaCommand } from '../../shared/data-models/commands/cargas-descargas/reimprimir-turno-playa-command';
import { DesplegableImpresorasPorUsuarioComponent } from '../../shared/desplegable-impresoras-por-usuario/desplegable-impresoras-por-usuario.component';
import { Collection } from '../../core/models/collection';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'yrd-reimprimir-turno-playa',
  templateUrl: './reimprimir-turno-playa.component.html',
  styleUrls: ['./reimprimir-turno-playa.component.css']
})

export class ReimprimirTurnoPlayaComponent
  implements OnInit, OnDestroy {

  @ViewChild('filtro') filtro: FiltroReimprimirTurnoPlayaComponent;
  @ViewChild('impresora') impresora: DesplegableImpresorasPorUsuarioComponent;

  form: FormGroup;
  disableButtons = true;
  movimientoDataView: ReimprimirTurnoPlayaDataView;
  private readonly onDestroy = new Subject();
  readonly validationMessagesImpresora = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Impresora)
  };

  constructor(private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              private readonly service: ReimprimirTurnoPlayaService,
              private readonly popupService: PopupService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.filtro.setFocus();
  }

  onClickBuscar(): void {
    const vendedor = this.fcService.getValue('filtro.vendedor');
    const tipoDocumentoPorte = this.fcService.getValue('filtro.tipoDocumentoPorte');
    const numeroDocumentoPorte = this.fcService.getValue('filtro.numeroDocumentoPorte');
    const ctg = this.fcService.getValue('filtro.ctg');

    if (numeroDocumentoPorte || ctg) {
      this.service.get(tipoDocumentoPorte, numeroDocumentoPorte, ctg , vendedor)
                  .pipe(takeUntil(this.onDestroy))
                  .subscribe((datos: ReimprimirTurnoPlayaDataView) => {
                    if (datos) {
                      this.movimientoDataView = datos;
                      if (this.validarEstadoMovimiento() && this.validarMovimientoEnCircuito()) {
                        this.loadMovimiento();
                        this.disableAfterSearch(true);
                      }
                    } else {
                      this.popupService.error(Resources.Messages.NoSeEncontraronResultados, Resources.Labels.Error);
                    }
                  });
    } else {
      this.popupService.error(Resources.Messages.VerificarDatosFiltroBusqueda, Resources.Labels.Buscar);
    }
  }

  onClickReimprimir(): void {
    if (this.fcService.isValidForm()) {
      const command = new ReimprimirTurnoPlayaCommand(this.movimientoDataView.id);
      command.idImpresora = this.fcService.getValue('impresion.impresora');
      this.service.reimprimirTurnoPlaya(command).subscribe(() => this.popupService.success(Resources.Messages.ReimpresionExitosa));
      this.cancelar();
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  onClickCancelar(): void {
    this.cancelar();
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  private createForm(): void {
    this.form = this.fb.group({
      filtro: this.fb.group({
        tipoDocumentoPorte: [null, Validators.required],
        ctg: {value: '', disabled: false},
        numeroDocumentoPorte: {value: '', disabled: false},
        vendedor: { value: '', disabled: false },
      }),
      detalle: this.fb.group({
        numeroControl: { value: '', disabled: true },
        producto: { value: '', disabled: true },
        codigoCupo: { value: '', disabled: true },
        estadoCupo: { value: '', disabled: true },
        remitenteComercial: { value: '', disabled: true },
        corredor: { value: '', disabled: true },
        destinatario: { value: '', disabled: true },
        finalidad: { value: '', disabled: true }
      }),
      impresion: this.fb.group({
        impresora: [{ value: undefined, disabled: true }, Validators.required]
      })
    });
    this.fcService.initialize(this.form);
  }

  private loadMovimiento(): void {
    this.fcService.setValue('detalle.numeroControl', this.movimientoDataView.numeroControl, { onlySelf: true });
    this.fcService.setValue('detalle.producto', this.movimientoDataView.producto, { onlySelf: true });
    this.fcService.setValue('detalle.codigoCupo', this.movimientoDataView.codigoCupo, { onlySelf: true });
    this.fcService.setValue('detalle.estadoCupo', this.movimientoDataView.estadoCupo, { onlySelf: true });
    this.fcService.setValue('detalle.remitenteComercial', this.movimientoDataView.remitenteComercial, { onlySelf: true });
    this.fcService.setValue('detalle.corredor', this.movimientoDataView.corredor, { onlySelf: true });
    this.fcService.setValue('detalle.destinatario', this.movimientoDataView.destinatario, { onlySelf: true });
    this.fcService.setValue('detalle.finalidad', this.movimientoDataView.finalidad, { onlySelf: true });
    this.fcService.setValue('impresion.impresora', this.movimientoDataView.impresoraDefectoUsuario, { OnlySelf: true }, false);
  }

  private validarEstadoMovimiento(): boolean {
    if (this.movimientoDataView.idTipoMovimiento === TiposMovimiento.Carga)  {
      this.popupService.error(Resources.Messages.LosDatosIngresadosNoIdentificanUnCamionEnCircuitoDeCarga, Resources.Labels.Error);
      return false;
    }
    return true;
  }

  private validarMovimientoEnCircuito(): boolean {
    if (this.movimientoDataView.idEstadoMovimiento === EstadosMovimiento.Finalizado ||
        this.movimientoDataView.idEstadoMovimiento === EstadosMovimiento.Rechazado) {
      this.popupService.error(Resources.Messages.ElCamionNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion, Resources.Labels.Error);
      return false;
    }
    return true;
  }

  private cancelar(): void {
    this.fcService.resetForm();
    this.disableAfterSearch(false);
  }

  private impresoraSetFocus(): void {
    setTimeout(() => {
      if (this.impresora) {
        this.impresora.setFocus();
      }
    }, 0);
  }

  private disableAfterSearch(disabled: boolean): void {
    this.disableButtons = !disabled;
    if (disabled) {
      this.fcService.enableControl('impresion.impresora');
      this.fcService.disableControl('filtro');
      this.impresoraSetFocus();
    } else {
      this.fcService.disableControl('impresion.impresora');
      this.fcService.enableControl('filtro');
      this.filtro.setFocus();
    }
  }

}
