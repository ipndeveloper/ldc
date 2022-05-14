import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resources } from '../../../locale/artifacts/resources';
import { Collection } from '../../core/models/collection';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ReimprimirObleaLaboratorioCommand } from '../../shared/data-models/commands/cargas-descargas/reimprimir-oblea-laboratorio-command';
import { ReimprimirObleaLaboratorioDataView } from '../../shared/data-models/reimprimir-oblea-laboratorio-data-view';
import { DesplegableImpresoraComponent } from '../../shared/desplegable-impresora/desplegable-impresora.component';
import { FiltroBusquedaReimpresionObleaLaboratorioComponent } from './filtro-busqueda-reimpresion-oblea-laboratorio/filtro-busqueda-reimpresion-oblea-laboratorio.component';
import { ReimprimirObleaLaboratorioService } from './reimprimir-oblea-laboratorio.service';

@Component({
  selector: 'yrd-reimprimir-oblea-laboratorio',
  templateUrl: './reimprimir-oblea-laboratorio.component.html',
  styleUrls: ['./reimprimir-oblea-laboratorio.component.css'],
})
export class ReimprimirObleaLaboratorioComponent implements OnInit, AfterViewInit {
  @ViewChild('filtrosMovimiento') filtro: FiltroBusquedaReimpresionObleaLaboratorioComponent;
  @ViewChild('desplegableImpresora')
  desplegableImpresora: DesplegableImpresoraComponent;
  reimprimirObleaLaboratorioForm: FormGroup;
  movimiento: ReimprimirObleaLaboratorioDataView;
  disableButtons = true;
  validationMessagesImpresora = {
    required: Resources.Messages.ElCampoXEsRequerido.format(
      Resources.Labels.Impresora
    )
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly fcService: FormComponentService,
    private readonly popupService: PopupService,
    private readonly searchMovimientoReimpresionObleaLaboratorioService: ReimprimirObleaLaboratorioService) {}

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit() {
    this.fcService.disableControl('impresion.impresora');
    this.filtro.setFocus();
  }

  onClickBuscar() {
    const numeroDocumentoPorte = this.fcService.getValue('filtrosMovimiento.numeroDocumentoPorte');
    if (numeroDocumentoPorte) {
      this.searchMovimientoReimpresionObleaLaboratorioService.getMovimientoReimpresionObleaLaboratorio(numeroDocumentoPorte)
      .subscribe((movimiento: ReimprimirObleaLaboratorioDataView) => {
        if (movimiento) {
          this.movimiento = movimiento;
            this.loadMovimiento();
            this.loadImpresoraDefecto();
            this.disableButtons = false;
            this.desplegableImpresora.setFocus();
        } else {
          this.popupService.error(
            Resources.Messages.NoSeEncontraronResultados,
            Resources.Labels.Error
          );
        }
      });
    } else {
      this.popupService.error( Resources.Messages.DebeIngresarUnDocumentoPorte, Resources.Labels.Buscar);
    }
  }

  onClickReimprimir() {
    if (this.fcService.isValidForm()) {
      const command = new ReimprimirObleaLaboratorioCommand(
        this.movimiento.id
      );
      command.idImpresora = this.fcService.getValue('impresion.impresora');

      this.searchMovimientoReimpresionObleaLaboratorioService.reimprimirOblea(command).subscribe(() =>
          this.popupService.success(Resources.Messages.ReimpresionExitosa)
        );
      this.cancelar();
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.reimprimirObleaLaboratorioForm.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  onClickCancelar() {
    this.cancelar();
  }

  private createForm() {
    this.reimprimirObleaLaboratorioForm = this.fb.group({
      filtrosMovimiento: this.fb.group({
        numeroDocumentoPorte: [
          { value: '', disabled: false },
          {
            validators: [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(12),
              Validators.pattern(/^\d+$/),
            ],
            updateOn: 'blur',
          },
        ],
      }),
      datosMovimiento: this.fb.group({
        producto: { value: '', disabled: true },
        patenteCamion: { value: '', disabled: true },
        patenteAcoplado: { value: '', disabled: true },
        estado: {value: '', disabled: true}
      }),
      impresion: this.fb.group({
        impresora: [{ value: '', disabled: true }, Validators.required],
      }),
    });
    this.fcService.initialize(this.reimprimirObleaLaboratorioForm);
  }

  private loadMovimiento() {
    this.fcService.setValue('datosMovimiento.producto', this.movimiento.producto, { onlySelf: true });
    this.fcService.setValue('datosMovimiento.patenteCamion', this.movimiento.patenteCamion, { onlySelf: true });
    this.fcService.setValue('datosMovimiento.patenteAcoplado', this.movimiento.patenteAcoplado, { onlySelf: true });
    this.fcService.setValue('datosMovimiento.estado', this.movimiento.estadoMovimiento, { onlySelf: true });
  }

  private loadImpresoraDefecto() {
    this.fcService.setValue( 'impresion.impresora', this.movimiento.impresoraDefectoUsuario, { onlySelf: true }, false);
  }

  private cancelar() {
    this.disableButtons = true;
    this.fcService.resetForm();
    this.fcService.disableControl('impresion.impresora');
    this.filtro.setFocus();
  }
}
