import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { AutocompleteVagonComponent } from '../../../shared/autocomplete-vagon/autocomplete-vagon.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../../app/core/services/session/auth.service';
import { NumeroConEtiquetaComponent } from '../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';

@Component({
  selector: 'yrd-busqueda-movimiento-pesaje-vagon',
  templateUrl: './busqueda-movimiento-pesaje-vagon.component.html',
  styleUrls: ['./busqueda-movimiento-pesaje-vagon.component.css']
})

export class BusquedaMovimientoPesajeVagonComponent implements OnInit, OnChanges {

  @Input() busquedaMovimientoForm: FormGroup;
  @Output() searchClicked: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('autocompleteVagon') autocompleteVagon: AutocompleteVagonComponent;
  @ViewChild('tarjeta') tarjeta: NumeroConEtiquetaComponent;
  @Input() disableButtons = false;
  esAutomatico: boolean;

  private readonly terminalUtilizaTarjeta: boolean;

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta)
  };

  validationMessagesNumeroVagon = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.NumeroDeVagon)
  };

  constructor(authService: AuthService) {

    const userContext = authService.getUserContext();
      if (userContext) {
        this.terminalUtilizaTarjeta = userContext.terminal.utilizaTarjeta;
      }
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (!this.busquedaMovimientoForm.enabled) {
      this.disableButtons = true;
    }
  }

  onClickIdentificarVagon(): void {
    if (this.busquedaMovimientoForm.valid || this.formIsValid()) {
      this.searchClicked.emit();
    }
  }

  private formIsValid(): boolean {
    return this.busquedaMovimientoForm.controls.numeroVagon.value;
  }

  setFocusVagon() {
    setTimeout(() => {
      this.autocompleteVagon.setFocus();
    }, 250);
  }

  setFocusTarjeta() {
    setTimeout(() => {
      this.tarjeta.setFocus();
    }, 0);
  }

  onTarjetaLeida() {
    if (this.terminalUtilizaTarjeta) {
      if (this.busquedaMovimientoForm.controls.tarjeta.value) {
        if (!this.busquedaMovimientoForm.controls.numeroVagon.value) {
          this.busquedaMovimientoForm.controls.tarjeta.setValue('');
        } else {
          this.onClickIdentificarVagon();
        }
      } else {
        this.tarjeta.setFocus();
      }
    } else {
      this.onClickIdentificarVagon();
    }
  }

  get botonIdentificarVagonDeshabilitado(): boolean {
    return this.terminalUtilizaTarjeta;
  }
}
