import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReimprimirTicketCalidadDataView } from '../../../shared/data-models/reimprimir-ticket-calidad-data-view';
import { ReimpresionTicketCalidadService } from '../services/reimpresion-ticket-calidad.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { AuthService } from '../../../core/services/session/auth.service';

@Component({
  selector: 'yrd-filtro-busqueda-reimpresion-ticket-calidad',
  templateUrl: './filtro-busqueda-reimpresion-ticket-calidad.component.html',
  styleUrls: ['./filtro-busqueda-reimpresion-ticket-calidad.component.css'],
  providers: [ReimpresionTicketCalidadService]
})

export class FiltroBusquedaReimpresionTicketCalidadComponent {

  @Input() filtrosForm: FormGroup;
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;
  @Output() movimientoRecuperado: EventEmitter<ReimprimirTicketCalidadDataView> =
  new EventEmitter<ReimprimirTicketCalidadDataView>();
  disableButtons: boolean;
  readonly terminalUtilizaTarjeta: boolean;

  constructor(private readonly popupService: PopupService,
    private readonly reimpresionTicketCalidadService: ReimpresionTicketCalidadService,
    authService: AuthService) {
      const userContext = authService.getUserContext();
      if (userContext) {
        this.terminalUtilizaTarjeta = userContext.terminal.utilizaTarjeta;
      }
     }

  getMovimientoReimpresionTicket() {
    const patenteControl = this.filtrosForm.get('patente');
    const vagonControl = this.filtrosForm.get('vagon');
    const tarjetaControl = this.filtrosForm.get('tarjeta');
    const turnoControl = this.filtrosForm.get('turno');

    if (patenteControl && vagonControl && tarjetaControl && turnoControl) {
      if (patenteControl.value || vagonControl.value || tarjetaControl.value || turnoControl.value) {
        this.reimpresionTicketCalidadService.getMovimientoReimpresionCalidad(patenteControl.value,
                                                                             vagonControl.value,
                                                                             tarjetaControl.value,
                                                                             turnoControl.value)
          .subscribe((datos: any) => {
            this.movimientoRecuperado.emit(datos);
          });
      } else {
        this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnFiltro, Resources.Labels.Buscar);
      }
    }
  }

  limpiar() {
    this.filtrosForm.reset();
    this.filtrosForm.controls.patente.setValue('');
    this.filtrosForm.controls.vagon.setValue('');
    this.filtrosForm.controls.tarjeta.setValue('');
    this.filtrosForm.controls.turno.setValue('');
  }

  setFocus() {
    if (this.autocompletePatente) {
      this.autocompletePatente.setFocus();
    }
  }

}
