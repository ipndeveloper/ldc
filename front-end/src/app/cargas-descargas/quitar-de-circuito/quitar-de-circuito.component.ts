import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { PopupService } from '../../core/services/popupService/popup.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { Actividades, TipoTransporteMovimiento } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { QuitarDeCircuitoService } from './quitar-de-circuito.service';
import { QuitarDeCircuitoCommand } from '../../shared/data-models/commands/cargas-descargas/quitar-de-circuito-command';
import { MovimientoQuitarDeCircuitoDataView } from '../../shared/data-models/movimiento-quitar-de-circuito-data-view';
import { TipoTransporte, tiposTransportes } from '../../shared/data-models/tipo-transporte';
import { Command, CommandService } from '../../shared/command-service/command.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'yrd-quitar-de-circuito',
  templateUrl: './quitar-de-circuito.component.html',
  styleUrls: ['./quitar-de-circuito.component.css'],
  providers: [ QuitarDeCircuitoService ]
})
export class QuitarDeCircuitoComponent implements OnInit, OnDestroy {

  quitarDeCircuitoForm: FormGroup;
  movimiento: MovimientoQuitarDeCircuitoDataView | null;
  circuito: Circuito;
  disableRechazonConCTG = true;
  @ViewChild('modalConfirmacion') modalConfirmacion: ModalComponent;
  deseaConfirmarEstaAccionMessage = Resources.Messages.DeseaConfirmarEstaAccion;
  disableButtons: boolean;
  rechazarConCTG: boolean;
  subscription: Subscription;

  constructor(private readonly fb: FormBuilder,
              private readonly formComponentService: FormComponentService,
              private readonly popupService: PopupService,
              private readonly circuitoService: CircuitoService,
              private readonly quitarDeCircuitoService: QuitarDeCircuitoService,
              private readonly commandService: CommandService) {
    this.subscription = this.commandService.commands.subscribe(c => this.handleCommand(c));
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleCommand(command: Command) {
    switch (command.name) {
      case 'Aceptar':
        this.openConfirmacion();
        break;
      case 'Cancelar':
        this.cancelar();
        break;
    }
  }

  private createForm() {
    this.quitarDeCircuitoForm = this.fb.group({
      filtroMovimiento: this.fb.group({
        tipoTransporte:  ['', Validators.required],
        patenteCamion: ['', Validators.required ],
        numeroVagon: [{value: '', disabled: true}, Validators.required],
      }),
      datosMovimiento: this.fb.group({
        tipoTransporte: { value: '', disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        estadoMovimiento: { value: '', disabled: true },
        tipoDocumentoPorte: { value: '', disabled: true },
        nroDocumentoPorte: { value: '', disabled: true },
        numeroCTG: { value: '', disabled: true },
        producto: { value: '', disabled: true },
        patenteCamion: { value: '', disabled: true },
        numeroVagon: { value: '', disabled: true },
        fechaHoraEntrada: { value: '', disabled: true },
        titular: { value: '', disabled: true },
        vendedor: { value: '', disabled: true },
        entregador: { value: '', disabled: true },
        turnoPlaya: { value: '', disabled: true },
        estadoCupo: { value: '', disabled: true },
        nroCupo: { value: '', disabled: true },
        ordenCarga: { value: '', disabled: true },
        numeroViaje: { value: '', disabled: true }
      })
    });

    this.formComponentService.initialize(this.quitarDeCircuitoForm);
    this.disableButtons = true;
  }

  completeDataQuitarDeCircuito(movimiento: MovimientoQuitarDeCircuitoDataView | null) {
    if (movimiento) {
      this.completeCircuito(movimiento).subscribe(() => {
        this.completeMovimiento(movimiento);
        if (this.movimiento) {
          this.setEnableFiltroBusqueda(false);
          this.disableButtons = false;
        }
      });
    } else {
      this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
    }
  }

  private completeCircuito(movimiento: MovimientoQuitarDeCircuitoDataView) {
    const idsActividad = [Actividades.SacarDeCircuito];
    return this.circuitoService.getCircuitoByIdByIdsActividad(movimiento.circuito.id, idsActividad)
      .pipe(
        map(datos => {
          this.circuito = new Circuito();
          Object.assign(this.circuito, datos);
        })
      );
  }

  private mensajePorTipoTransporte(movimiento: MovimientoQuitarDeCircuitoDataView) {
    if (movimiento) {
      if (movimiento.tipoTransporte === TipoTransporteMovimiento.Tren) {
        this.popupService.error(Resources.Messages.ElVagonNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion);
      } else {
        this.popupService.error(Resources.Messages.ElCamionNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion);
      }
    }
   }

  private completeMovimiento(movimiento: MovimientoQuitarDeCircuitoDataView) {
    const movimientoValido = this.validarMovimiento(movimiento);
    if (movimientoValido) {
      this.movimiento = movimiento;
    } else {
      this.mensajePorTipoTransporte(movimiento);
    }
  }

  private validarMovimiento(movimiento: MovimientoQuitarDeCircuitoDataView): boolean {
    return this.circuito.validarMovimiento(movimiento);
  }

  private setEnableFiltroBusqueda(enable: boolean) {
    enable ? this.quitarDeCircuitoForm.controls.filtroMovimiento.enable() : this.quitarDeCircuitoForm.controls.filtroMovimiento.disable();
  }

  quitar(observaciones: string) {
    const command = this.mapControlsToQuitarCircuitoCommand(observaciones);
    command.observaciones = observaciones;

     this.quitarDeCircuitoService.quitarDeCircuito(command)
       .subscribe(() => {
         this.popupService.success(Resources.Messages.QuitarDeCircuitoGuardado, Resources.Labels.Aceptar);
         this.resetForm();
     });
  }

  private mapControlsToQuitarCircuitoCommand(observaciones: string): QuitarDeCircuitoCommand {
     const idMovimiento = this.movimiento != null ? this.movimiento.id : 0;
     return new QuitarDeCircuitoCommand(idMovimiento, observaciones) ;
   }

  openConfirmacion() {
    if (this.circuito.validarMovimientoActividad(this.movimiento, Actividades.SacarDeCircuito)) {
      this.modalConfirmacion.open();
    } else {
      if (this.movimiento) {
        this.mensajePorTipoTransporte(this.movimiento);
      }
    }
  }

  cancelar() {
    this.resetForm();
  }

  private resetForm() {
    this.setEnableFiltroBusqueda(true);
    this.disableButtons = true;
    this.formComponentService.resetForm({emitEvent: true});
    this.formComponentService.setValue('filtroMovimiento.tipoTransporte', new TipoTransporte(tiposTransportes[0].id), {onlySelf: true});
    this.movimiento = null;
  }
}
