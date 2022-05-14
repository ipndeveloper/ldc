import { Component, Input, EventEmitter, Output, ViewChild, OnChanges, AfterViewInit, ElementRef } from '@angular/core';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableValorBooleanoComponent } from '../../../shared/desplegable-valor-booleano/desplegable-valor-booleano.component';
import { BalanzaService } from '../../shared/services/balanza.service';
import { Acciones, TiposDispositivo, SentidosBalanza } from '../../../shared/enums/enums';
import { DispositivoService } from '../../shared/services/dispositivo.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { AuthService } from '../../../../app/core/services/session/auth.service';
import { LecturaTarjetaComponent } from '../../shared/lectura-tarjeta/lectura-tarjeta.component';
import { EntityWithDescription } from '../../../core/models/entity-with-description';

@Component({
  selector: 'yrd-busqueda-movimiento-pesaje',
  templateUrl: './busqueda-movimiento-pesaje.component.html',
  styleUrls: ['./busqueda-movimiento-pesaje.component.css']
})
export class BusquedaMovimientoPesajeComponent implements OnChanges, AfterViewInit {

  @Input() busquedaMovimientoForm: FormGroup;
  @Input() disableButtons = false;
  @Input() esFueraCircuito;
  @Input() esTren;
  @Input() esNavegacion = false;
  @Output() searchClicked = new EventEmitter<string>();
  @Output() habilitarBalanzaClicked = new EventEmitter<any>();
  @ViewChild('tarjeta') tarjeta: LecturaTarjetaComponent;
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;
  @ViewChild('botonHabilitarBalanza') botonHabilitarBalanza: ElementRef;
  @ViewChild('desplegableValorBooleano') desplegableValorBooleano: DesplegableValorBooleanoComponent;
  balanzaHabilitada = false;
  esAutomatico: boolean;
  tieneTarjeta: boolean;
  sentidoBalanza: EntityWithDescription | null = null;
  isLoading = false;
  private readonly terminalUtilizaTarjeta: boolean;

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta)
  };

  validationMessagesPatenteCamion = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.PatenteCamion)
  };

  constructor(private readonly balanzaService: BalanzaService,
              private readonly dispositivoService: DispositivoService,
              private readonly popupService: PopupService,
              authService: AuthService) {

    const userContext = authService.getUserContext();
    if (userContext) {
      this.terminalUtilizaTarjeta = userContext.terminal.utilizaTarjeta;
    }

  }

  ngAfterViewInit(): void {
    this.init();
    this.determinarSentidoBalanza();
  }

  resetForm(): void {
    this.balanzaHabilitada = false;
    this.determinarAccionHabilitarPlataformaAutomatica();
    this.deshabilitarControles();
  }

  private init(): void {
    if (!this.esFueraCircuito) {
      this.determinarAccionHabilitarPlataformaAutomatica();
    }
  }

  private determinarAccionHabilitarPlataformaAutomatica(): void {
    this.dispositivoService.consultarAccion(Acciones.HabilitarPlataformaBalanza).subscribe(accion => {
      this.esAutomatico = accion.esAutomatica;
      if (this.esAutomatico) {
        this.busquedaMovimientoForm.controls.patenteCamion.disable();
        this.busquedaMovimientoForm.controls.tarjeta.disable();
        if (this.busquedaMovimientoForm.controls.sinTarjeta) {
          this.busquedaMovimientoForm.controls.sinTarjeta.disable();
        }
      } else {
        this.busquedaMovimientoForm.controls.patenteCamion.enable();
        if (this.terminalUtilizaTarjeta) {
          this.busquedaMovimientoForm.controls.tarjeta.enable();
          if (this.busquedaMovimientoForm.controls.sinTarjeta) {
            this.busquedaMovimientoForm.controls.sinTarjeta.enable();
          }
        }
        this.balanzaHabilitada = true;
      }
    });
  }

  determinarSentidoBalanza(): void {
    this.dispositivoService.consultarTiposDispositivos([TiposDispositivo.BalanzaCamion]).subscribe(balanzas => {
      if (balanzas && balanzas[0] && balanzas[0].sentidoBalanza) {
        if (balanzas[0].sentidoBalanza.id !== SentidosBalanza.EntradaSalida) {
          this.busquedaMovimientoForm.controls.esEntrada.setValue(balanzas[0].sentidoBalanza);
          this.busquedaMovimientoForm.controls.esEntrada.disable();
          this.sentidoBalanza = balanzas[0].sentidoBalanza;
        } else {
          this.sentidoBalanza = null;
        }
      }
      this.setFocus();
    });
  }

  ngOnChanges(): void {
    if (!this.busquedaMovimientoForm.enabled) {
      this.disableButtons = true;
    }
  }

  onClickIdentificarCamion(): void {
    if (this.busquedaMovimientoForm.valid || this.formIsValid()) {
      this.searchClicked.emit();
    }
  }

  private formIsValid(): boolean {
    return this.busquedaMovimientoForm.controls.patenteCamion.value &&
      ((this.busquedaMovimientoForm.controls.tarjeta.value &&
      !this.busquedaMovimientoForm.controls.sinTarjeta.value) ||
      (!this.busquedaMovimientoForm.controls.tarjeta.value &&
       this.busquedaMovimientoForm.controls.sinTarjeta.value));
  }

  habilitarBalanza(): void {
    const sentido = this.busquedaMovimientoForm.controls.esEntrada.value;
    if (sentido) {
      this.isLoading = true;
      this.balanzaService.habilitarBalanza(sentido.id === 1).subscribe(() => {
        this.isLoading = false;
        this.balanzaHabilitada = true;
        if (!this.esNavegacion) {
          if (this.terminalUtilizaTarjeta) {
            this.busquedaMovimientoForm.controls.tarjeta.enable();
            this.busquedaMovimientoForm.controls.sinTarjeta.enable();
          }
          this.busquedaMovimientoForm.controls.patenteCamion.enable();
          this.setFocusPatente();
        } else {
          this.habilitarBalanzaClicked.emit();
        }
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status === HttpStatus.BAD_GATEWAY) {
          this.popupService.error(error.error.message, 'Error de Conexión');
        }
      });
    }
  }

  private deshabilitarControles(): void {
    if (this.esTren) {
      this.busquedaMovimientoForm.controls.numeroVagon.disable();
    }
    if (!this.terminalUtilizaTarjeta) {
      this.busquedaMovimientoForm.controls.tarjeta.disable();
      this.busquedaMovimientoForm.controls.sinTarjeta.disable();
    }
  }

  setFocus(): void {
    if (!this.esFueraCircuito) {
      setTimeout(() => {
        if (this.sentidoBalanza === null) {
          this.desplegableValorBooleano.setFocus();
        } else if (this.esAutomatico) {
          this.botonHabilitarBalanza.nativeElement.focus();
        } else {
          this.setFocusPatente();
        }
      }, 250);
    }
  }

  setFocusTarjeta(): void {
    setTimeout(() => {
      this.tarjeta.setFocus();
    }, 0);
  }

  setFocusPatente(): void {
    setTimeout(() => {
      this.autocompletePatente.setFocus();
    }, 250);
  }

  setFocusHabilitarBalanza(): void {
    setTimeout(() => {
      this.botonHabilitarBalanza.nativeElement.focus();
    }, 0);
  }

  onTarjetaLeida(): void {
    if (this.terminalUtilizaTarjeta) {
      if (this.busquedaMovimientoForm.controls.tarjeta.value) {
        if (!this.busquedaMovimientoForm.controls.patenteCamion.value) {
          this.busquedaMovimientoForm.controls.tarjeta.setValue('');
          if (this.autocompletePatente) {
            this.autocompletePatente.setFocus();
          }
        } else {
          this.onClickIdentificarCamion();
        }
      } else {
        this.tarjeta.setFocus();
      }
    } else {
      this.onClickIdentificarCamion();
    }
  }

  get botonIdentificarCamionDeshabilitado(): boolean {
    const haSeleccionadoOpcionSinTarjeta = this.busquedaMovimientoForm.controls.sinTarjeta.value;
    return this.esNavegacion || (
      (this.esAutomatico && !this.balanzaHabilitada) ||
      (!haSeleccionadoOpcionSinTarjeta && this.terminalUtilizaTarjeta)
    );
  }

}
