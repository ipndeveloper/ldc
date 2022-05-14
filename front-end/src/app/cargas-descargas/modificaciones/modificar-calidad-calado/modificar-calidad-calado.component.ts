import { Component, Input } from '@angular/core';
import { IngresarCalidadBaseComponent } from '../../shared/ingresar-calidad-base/ingresar-calidad-base.component';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { FormBuilder } from '@angular/forms';
import { CircuitoService } from '../../shared/services/circuito.service';
import { RubrosCalidadService } from '../../ingresar-calidad-calado/rubros-calidad/rubros-calidad.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { ConfirmacionProductoCalado } from '../../ingresar-calidad-calado/confirmaciones/confirmacionProductoCalado.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { DropdownNotificationService } from '../../../core/shared/super/dropdown-notification.service';
import { GrupoRubroCalidadAnalisis } from '../../../shared/data-models/grupo-rubro-calidad-analisis';
import { IngresarCalidadCaladoService } from '../../ingresar-calidad-calado/ingresar-calidad-calado.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { Actividades, Operaciones } from '../../../shared/enums/enums';
import { takeUntil } from 'rxjs/operators';
import { MovimientoCalado } from '../../../shared/data-models/movimiento-calado';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { CaladoService } from '../../ingresar-calidad-calado/calado.service';
import { CommandService } from '../../../shared/command-service/command.service';
import { MovimientoService } from '../../shared/services/movimiento.service';

@Component({
  selector: 'yrd-modificar-calidad-calado',
  templateUrl: './modificar-calidad-calado.component.html',
  styleUrls: ['./modificar-calidad-calado.component.css']
})
export class ModificarCalidadCaladoComponent extends IngresarCalidadBaseComponent {

  @Input() esCarga: boolean;

  constructor(
    popupService: PopupService,
    fb: FormBuilder,
    ingresarCalidadCaladoService: IngresarCalidadCaladoService,
    circuitoService: CircuitoService,
    rubroCalidadService: RubrosCalidadService,
    formComponentService: FormComponentService,
    confirmacionProductoCalado: ConfirmacionProductoCalado,
    navigationService: NavigationService,
    caladoService: CaladoService,
    grupoRubroAnalisisNotificationService: DropdownNotificationService<GrupoRubroCalidadAnalisis>,
    authService: AuthService,
    private readonly eventsNotifierService: DescargaEventsNotifierService,
    protected readonly commandService: CommandService,
    movimientoService: MovimientoService) {
      super(popupService, fb, ingresarCalidadCaladoService, circuitoService, rubroCalidadService,
            formComponentService, confirmacionProductoCalado,
            navigationService, caladoService, grupoRubroAnalisisNotificationService, authService,
            commandService, movimientoService);
      this.operacion = Operaciones.Modificacion;
      this.basePath = 'ModificarCalidadCalado';
      this.esFueraCircuito = false;
      this.esNavegacion = true;
  }

  protected getActividades(): number[] {

    let idsActividad: number[];
    idsActividad = [];
    if (this.esFueraCircuito) {
      idsActividad.push(Actividades.ModificarCalidadFueraCircuito);
    } else {
      idsActividad.push(Actividades.ModificarCalidadFueraDePuesto);
    }
    return idsActividad;
  }

  protected getPartialPath() {
    if (this.esFueraCircuito) {
      return 'modificar-fuera-de-circuito';
    } else {
      return 'modificar-fuera-de-puesto';
    }
  }

  subscribeNavigation() {
    this.navigationService.requestExtras()
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe((extras) => {
        this.fillFormPostNavegacion(extras);
      });
  }

  protected prepareForm(movimientoCalado: MovimientoCalado) {
    super.prepareForm(movimientoCalado);
    this.ingresarCalidadCaladoForm.controls.accion.disable();
    const fecha = movimientoCalado.fechaStockSan ? new Date(movimientoCalado.fechaStockSan).toLocalISOString().substring(0, 10) : undefined;
    this.formComponentService.setValue(`fechaPeriodoStockSan.fechaStock`, fecha, {onlySelf: true}, false);

  }

  openConsultarCalidadAnterior(): void {
    if (this.movimiento) {
      this.showCalidadAnterior = true;
      this.eventsNotifierService.onMovimientoCaladoRetrieved(this.movimiento);
    }
  }
}
