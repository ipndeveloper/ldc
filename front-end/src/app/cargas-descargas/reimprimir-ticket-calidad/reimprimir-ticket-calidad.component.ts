import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReimprimirTicketCalidadDataView } from '../../shared/data-models/reimprimir-ticket-calidad-data-view';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ReimpresionTicketCalidadService } from './services/reimpresion-ticket-calidad.service';
import { Resources } from '../../../locale/artifacts/resources';
import { ReimprimirTicketCalidadCommand } from '../../shared/data-models/commands/cargas-descargas/reimprimir-ticket-calidad-command';
import { FiltroBusquedaReimpresionTicketCalidadComponent } from './filtro-busqueda-reimpresion-ticket-calidad/filtro-busqueda-reimpresion-ticket-calidad.component';
import { DesplegableImpresoraComponent } from '../../shared/desplegable-impresora/desplegable-impresora.component';
import { Collection } from '../../core/models/collection';
import { AuthService } from '../../core/services/session/auth.service';
import { Terminal } from '../../shared/data-models/terminal';

@Component({
  selector: 'yrd-reimprimir-ticket-calidad',
  templateUrl: './reimprimir-ticket-calidad.component.html',
  styleUrls: ['./reimprimir-ticket-calidad.component.css'],
  providers: [ReimpresionTicketCalidadService]
})

export class ReimprimirTicketCalidadComponent implements OnInit {

  @ViewChild('filtroMovimiento') filtro: FiltroBusquedaReimpresionTicketCalidadComponent;
  @ViewChild('desplegableImpresora') desplegableImpresora: DesplegableImpresoraComponent;
  reimprimirTicketCalidadForm: FormGroup;
  movimiento: ReimprimirTicketCalidadDataView;
  disableButtons = true;
  terminal: Terminal;
  validationMessagesImpresora = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Impresora)
  };

  constructor(private readonly fb: FormBuilder,
              private readonly formComponentService: FormComponentService,
              private readonly popupService: PopupService,
              private readonly searchMovimientoReimpresionCalidadService: ReimpresionTicketCalidadService,
              private readonly authService: AuthService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
    }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.reimprimirTicketCalidadForm = this.fb.group({
      filtroMovimiento: this.fb.group({
        patente: { value: '', disabled: false },
        tarjeta: { value: '', disabled: false },
        turno: { value: '', disabled: false },
        vagon: { value: '', disabled: false }
      }),
      impresion: this.fb.group({
        impresora: [{ value: '', disabled: true }, Validators.required],
      }),
      datosMovimiento: this.fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        nroDocumentoPorte: { value: '', disabled: true },
        ctg: { value: '', disabled: true },
        impresora: [{ value: undefined, disabled: true}, Validators.required],
        producto: { value: '', disabled: true },
        estado: { value: '', disabled: true }
      })
    });

    this.formComponentService.initialize(this.reimprimirTicketCalidadForm);
    this.desplegableImpresora.opcionSeleccione = true;
  }

  completeData(dataView: ReimprimirTicketCalidadDataView | null): void {
    this.completeDataMovimiento(dataView);
    this.formComponentService.setValue(`impresion.impresora`, this.movimiento.impresoraDefectoUsuario, { onlySelf: true });
    this.setEnableDesplegableImpresora(true);
  }

  private completeDataMovimiento(movimiento: ReimprimirTicketCalidadDataView | null) {
    if (movimiento) {
      this.movimiento = movimiento;
      this.formComponentService.setValue(`datosMovimiento.tipoDocumentoPorte`, this.movimiento.tipoDocumentoPorte, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.nroDocumentoPorte`, this.movimiento.nroDocumentoPorte, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.ctg`, this.movimiento.ctg, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.producto`, this.movimiento.producto, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.estado`, this.movimiento.estado, { onlySelf: true });
      this.setEnableFiltroBusqueda(false);
      this.disableButtons = false;
    } else {
      this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
    }
  }

  private setEnableFiltroBusqueda(enable: boolean) {
    enable ? this.reimprimirTicketCalidadForm.controls.filtroMovimiento.enable() :
             this.reimprimirTicketCalidadForm.controls.filtroMovimiento.disable();
  }

  imprimir() {
    if (this.movimiento) {
      const errors = new Collection<string>();
      this.formComponentService.validateForm(this.reimprimirTicketCalidadForm.controls, errors, '');
      this.formComponentService.showValidationError(errors);

      if (this.formComponentService.isValidForm()) {
        const command = new ReimprimirTicketCalidadCommand(this.movimiento.id);
        command.idImpresora = this.formComponentService.getValue(`impresion.impresora`);
        this.searchMovimientoReimpresionCalidadService.reimprimirTicket(command)
          .subscribe(() => this.popupService.success(Resources.Messages.ReimpresionExitosa));
        this.setEnableFiltroBusqueda(true);
        this.setEnableDesplegableImpresora(false);
        this.resetForm();
      }
    }
  }

  cancelar() {
    this.resetForm();
    this.setEnableFiltroBusqueda(true);
    this.setEnableDesplegableImpresora(false);
    this.habilitarTarjetaSegunTerminal();
  }

  private resetForm() {
    this.setEnableFiltroBusqueda(true);
    this.setEnableDesplegableImpresora(false);
    this.reimprimirTicketCalidadForm.controls.datosMovimiento.reset();
    this.reimprimirTicketCalidadForm.controls.impresion.reset();
    if (this.filtro) {
      this.filtro.limpiar();
      this.filtro.setFocus();
    }
    this.disableButtons = true;
  }

  private setEnableDesplegableImpresora(enable: boolean) {
    const impresoraControl = this.formComponentService.getControl(`impresion.impresora`);
    if (impresoraControl) {
      if (enable) {
        impresoraControl.enable();
        setTimeout(() => {
          this.desplegableImpresora.setFocus();
        }, 0);
      } else {
        impresoraControl.disable();
      }
    }
  }

  private habilitarTarjetaSegunTerminal() {
    const tarjeta = this.reimprimirTicketCalidadForm.get('filtroMovimiento.tarjeta');
    if (!this.terminal.utilizaTarjeta && tarjeta != null) {
      tarjeta.disable();
    }
  }

}
