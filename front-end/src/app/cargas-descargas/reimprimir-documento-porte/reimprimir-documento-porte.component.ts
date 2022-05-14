import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ReimprimirDocumentoPorteService } from './reimprimir-documento-porte.service';
import { ReimprimirDocumentoPorteDataView } from '../../shared/data-models/reimprimir-documento-porte-data-view';
import { EstadosMovimiento, TiposMovimiento } from '../../shared/enums/enums';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { ReimprimirDocumentoPorteCommand } from '../../shared/data-models/commands/cargas-descargas/reimprimir-documento-porte-command';
import { FiltroBusquedaReimpresionDocumentoPorteComponent } from './filtro-busqueda-reimpresion-documento-porte/filtro-busqueda-reimpresion-documento-porte.component';
import { Collection } from '../../core/models/collection';
import { DesplegableImpresorasPorUsuarioComponent } from '../../shared/desplegable-impresoras-por-usuario/desplegable-impresoras-por-usuario.component';

@Component({
  selector: 'yrd-reimprimir-documento-porte',
  templateUrl: './reimprimir-documento-porte.component.html',
  styleUrls: ['./reimprimir-documento-porte.component.css']
})

export class ReimprimirDocumentoPorteComponent implements OnInit, AfterViewInit {

  @ViewChild('filtroReimpresion') filtroReimpresion: FiltroBusquedaReimpresionDocumentoPorteComponent;
  @ViewChild('desplegableImpresora') desplegableImpresora: DesplegableImpresorasPorUsuarioComponent;

  reimprimirDocumentoPorteForm: FormGroup;
  documentoPorteDataView: ReimprimirDocumentoPorteDataView;
  disableButtons = true;
  idMovimiento: number | undefined;
  readonly validationMessagesImpresora = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Impresora)
  };

  constructor(private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              private readonly service: ReimprimirDocumentoPorteService,
              private readonly popupService: PopupService) { }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit() {
    this.fcService.disableControl('impresion.impresora');
    this.filtroReimpresion.setFocus();
  }

  onClickBuscar() {
    if (this.fcService.isValidForm()) {
    const tipoDocumentoPorte = this.fcService.getValue('filtrosForm.tipoDocumentoPorte');
    const ctg = this.fcService.getValue('filtrosForm.ctg');

    let numeroDocumentoPorte = this.fcService.getValue('filtrosForm.numeroDocumentoPorte');
    numeroDocumentoPorte = numeroDocumentoPorte ? numeroDocumentoPorte : '';

    this.service.get(tipoDocumentoPorte, numeroDocumentoPorte, ctg)
                .subscribe((documentoPorteDataView: ReimprimirDocumentoPorteDataView) => {
                  if (documentoPorteDataView) {
                    this.documentoPorteDataView = documentoPorteDataView;
                    if (this.validarEstadoMovimiento() && this.validarMovimientoEnCircuito()) {
                      this.loadMovimiento();
                      this.loadImpresoraDefecto();
                      this.disableButtons = false;
                      this.desplegableImpresora.setFocus();
                    }
                  } else {
                    this.popupService.error(Resources.Messages.NoSeEncontraronResultados, Resources.Labels.Error);
                  }
                });
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.reimprimirDocumentoPorteForm.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  onClickReimprimir() {
    if (this.fcService.isValidForm()) {
      const command = new ReimprimirDocumentoPorteCommand(this.documentoPorteDataView.id);
      command.idImpresora = this.fcService.getValue('impresion.impresora');

      this.service.reimprimirTicket(command).subscribe(() => this.popupService.success(Resources.Messages.ReimpresionExitosa));
      this.cancelar();
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.reimprimirDocumentoPorteForm.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  onClickCancelar() {
    this.cancelar();
  }

  private createForm() {
    this.reimprimirDocumentoPorteForm = this.fb.group({
      filtrosForm: this.fb.group({
        tipoDocumentoPorte: [{ value: '', disabled: false }, Validators.required],
        ctg:  [{ value: '', disabled: true }, {
          validators: [
            Validators.required,
          ],
          updateOn: 'blur'
        }],
        numeroDocumentoPorte: [{ value: '', disabled: false }, {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12),
            Validators.pattern(/^\d+$/)
          ],
          updateOn: 'blur'
        }]
      }),
      datosMovimiento: this.fb.group({
        producto: { value: undefined, disabled: true },
        ordenCarga: { value: '', disabled: true },
        numeroViaje: { value: '', disabled: true },
        patenteCamion: { value: '', disabled: true },
        patenteAcoplado: { value: '', disabled: true },
        corredorComprador: { value: '', disabled: true },
        remitenteComercial: { value: '', disabled: true }
      }),
      impresion: this.fb.group({
        impresora: [{ value: '', disabled: true }, Validators.required],
      })
    });
    this.fcService.initialize(this.reimprimirDocumentoPorteForm);
  }

  private loadMovimiento() {
    this.fcService.setValue('datosMovimiento.producto', this.documentoPorteDataView.producto, {onlySelf: true});
    this.fcService.setValue('datosMovimiento.ordenCarga', this.documentoPorteDataView.ordenCarga, {onlySelf: true});
    this.fcService.setValue('datosMovimiento.numeroViaje', this.documentoPorteDataView.numeroViaje, {onlySelf: true});
    this.fcService.setValue('datosMovimiento.patenteCamion', this.documentoPorteDataView.patenteCamion, {onlySelf: true});
    this.fcService.setValue('datosMovimiento.patenteAcoplado', this.documentoPorteDataView.patenteAcoplado, {onlySelf: true});
    this.fcService.setValue('datosMovimiento.corredorComprador', this.documentoPorteDataView.corredorComprador, {onlySelf: true});
    this.fcService.setValue('datosMovimiento.remitenteComercial', this.documentoPorteDataView.remitenteComercial, {onlySelf: true});
  }

  private loadImpresoraDefecto() {
    this.fcService.setValue('impresion.impresora', this.documentoPorteDataView.impresoraDefectoUsuario, {onlySelf: true}, false);
  }

  private validarEstadoMovimiento(): boolean {
    if ( this.documentoPorteDataView.idTipoMovimiento === TiposMovimiento.Descarga)  {
          this.popupService.error(Resources.Messages.LosDatosIngresadosNoIdentificanUnCamionEnCircuitoDeCarga, Resources.Labels.Error);
          return false;
        }
    return true;
  }

  private validarMovimientoEnCircuito(): boolean {
    if ( this.documentoPorteDataView.idEstadoMovimiento !== EstadosMovimiento.Finalizado &&
         this.documentoPorteDataView.idEstadoMovimiento !== EstadosMovimiento.Rechazado) {
        this.popupService.error(Resources.Messages.ElCamionIdentificadoNoHaFinalizadoLaCargaConExito, Resources.Labels.Error);
        return false;
      }
    return true;
  }

  private cancelar() {
    this.disableButtons = true;
    this.fcService.resetForm();
    this.fcService.disableControl('impresion.impresora');
    this.filtroReimpresion.setFocus();
  }
}
